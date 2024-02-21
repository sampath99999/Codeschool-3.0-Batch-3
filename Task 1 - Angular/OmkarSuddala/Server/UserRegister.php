
<?php

require("./utils/connection.php");

$pdo = connect();

$username = json_decode(file_get_contents('php://input'), true)['username'];
$email = json_decode(file_get_contents('php://input'), true)['email'];
$password = json_decode(file_get_contents('php://input'), true)['password'];

if (empty($username)) {
    sendResponse(false, "Name is required");
}
if (empty($email)) {
    sendResponse(false, "Email is required");
}
if (empty($password)) {
    sendResponse(false, "Password is required");
}


function test_input($data)
{
    $data = trim($data);
    $data = stripslashes($data);
    $data = htmlspecialchars($data);
    return $data;
}


$passwords = md5($password);




$query = "SELECT * FROM userdetailes WHERE email = :email ";
$stmt = $pdo->prepare($query);
$stmt->bindParam("email", $email, PDO::PARAM_STR);
$stmt->execute();
if ($stmt->rowCount() > 0) {
    sendResponse(false, "Email  already exists");
}


$query = "INSERT INTO userdetailes(
    username ,
        email ,
        password 
) VALUES (:username, :email, :password)";

$stmt = $pdo->prepare($query);
$stmt->bindParam("username", $username, PDO::PARAM_STR);
$stmt->bindParam("email", $email, PDO::PARAM_STR);

$stmt->bindParam("password", $passwords, PDO::PARAM_STR);

$stmt->execute();
if ($stmt->rowCount() > 0) {
    sendResponse(true, "Registered Successfully");
} else {
    sendResponse(false, "User registration failed");
}
