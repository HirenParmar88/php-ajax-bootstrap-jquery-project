<?php
include('dbConnection.php');

$data=stripcslashes(file_get_contents("php://input"));
$mydata=json_decode($data, true);

$id=$mydata['id'];
$name=$mydata['name'];
$email=$mydata['email'];
$password=$mydata['password'];

//insert data
/*
if(!empty($name)&& !empty($email)&& !empty($password)){
    $sql="INSERT INTO student(name,email,password) VALUES ('$name','$email','$password')";
    if($conn->query($sql)==TRUE){
        echo"data saved successfully";
    }else{
        echo"Error !!";
    }
}else{
    echo"Fill all fields !";
}
*/

//insert or update data
if(!empty($name)&& !empty($email)&& !empty($password)){
    $sql="INSERT INTO student(id, name,email,password) VALUES ('$id','$name','$email','$password') ON DUPLICATE KEY UPDATE name='$name',email='$email',password='$password'";
    if($conn->query($sql)==TRUE){
        echo"data saved successfully";
    }else{
        echo"Error !!";
    }
}else{
    echo"Fill all fields !";
}

?>