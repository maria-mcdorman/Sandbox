<?php

//connect to db
$conn = mysqli_connect('localhost','root','','ajaxtest');

//query string
$query = 'SELECT * FROM users';

//get result using conn and query
$result = mysqli_query($conn,$query);

//fatch data from result
$users = mysqli_fetch_all($result,MYSQLI_ASSOC);

echo json_encode($users);
