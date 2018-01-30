<?php

//connect to db
$conn = mysqli_connect('localhost','root','','ajaxtest');

echo 'Processing......';



//Check for POST variable
if(isset($_POST['name'])){
    $name = mysqli_real_escape_string($conn,$_POST['name']);
    //echo 'POST: your name is '. $_POST['name'];

    $query = "insert into users(name) values('$name')";

    if(mysqli_query($conn, $query)){
        echo 'User added';
    } else {
        echo 'ERROR: ' + mysqli_error($conn);
    }
}

//Check for GET variable
if(isset($_GET['name'])){
    echo 'GET: your name is '. $_GET['name'];
}