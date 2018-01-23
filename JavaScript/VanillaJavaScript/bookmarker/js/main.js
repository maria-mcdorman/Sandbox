//Listen for form submit
document.getElementById('myForm').addEventListener('submit', saveBookmark);

//save mookmark
function saveBookmark(e){
  //get form values
  var siteName = document.getElementById('siteName').value;
  var siteUrl = document.getElementById('siteUrl').value;

  if(!validateForm(siteName, siteUrl)){
    return false;
  }
  
  var bookmark = {
    name: siteName,
    url: siteUrl
  }

  //check if bookmarks array is null
  if(localStorage.getItem('bookmarks') === null){
    //array is null so init
    var bookmarks = [];
    //add to array
    bookmarks.push(bookmark);
    //re send bookmarks local storage
    localStorage.setItem('bookmarks',JSON.stringify(bookmarks));
  }
  else {
    //fetch bookmarks from local storage
    var bookmarks = JSON.parse(localStorage.getItem('bookmarks'));
    //add bookmark to array
    bookmarks.push(bookmark);
    //re send local storage
    localStorage.setItem('bookmarks',JSON.stringify(bookmarks));
  }

  //clear form
  document.getElementById('myForm').reset();

  //re-fetch bookmarks
  fetchBookmarks();

  //local storage
  // localStorage.setItem('test', 'Hello');
  // console.log(localStorage.getItem('test'));
  // localStorage.removeItem('test');
  // console.log(localStorage.getItem('test'));

  //prevent form from submitting
  e.preventDefault();
}

function deleteBookmark(url){
  //get bookmarks fro local storage
  var bookmarks = JSON.parse(localStorage.getItem('bookmarks'));
  //loop through bookmarks
  for(var i = 0; i < bookmarks.length; i++){
    if(bookmarks[i].url == url){
      bookmarks.splice(i,1);
    }
    //re send bookmarks local storage
    localStorage.setItem('bookmarks',JSON.stringify(bookmarks));
    //re-fetch bookmarks
    fetchBookmarks();
  }
}

function fetchBookmarks(){
  //on page load get bookmarks from local storage
  var bookmarks = JSON.parse(localStorage.getItem('bookmarks'));
  //get output id
  var bookmarksResults = document.getElementById('bookmarksResults');

  //build output
  bookmarksResults.innerHTML = '';

  for(var i = 0; i < bookmarks.length; i++){
    var name = bookmarks[i].name;
    var url = bookmarks[i].url;

    bookmarksResults.innerHTML += '<div class="well">'+
                                  '<h3>'+name+
                                  ' <a class="btn btn-default" target="_blank" href="'+url+'">Visit</a> ' +
                                  ' <a onclick="deleteBookmark(\''+url+'\')" class="btn btn-danger" href="#">Delete</a> ' +
                                  '</h3>'+
                                  '</div>';
  }
}

//validate form
function validateForm(siteName, siteUrl){
  if(!siteName || !siteUrl){
    alert('Please fill in the form');
    return false;
  }

  var expression = /[-a-zA-Z0-9@:%_\+.~#?&//=]{2,256}\.[a-z]{2,4}\b(\/[-a-zA-Z0-9@:%_\+.~#?&//=]*)?/gi;
  var regex = new RegExp(expression);

  if(!siteUrl.match(regex)){
    alert('Please use a valid URL');
    return false;
  }

  return true;
}