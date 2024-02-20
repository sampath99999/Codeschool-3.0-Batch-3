<?php
include_once("../Database-connection/cors.php");
require_once("../Database-connection/dbconnection.php");
require_once("../Database-connection/functions.php");

if ($_SERVER["REQUEST_METHOD"] != "POST") {
    response("Only POST method accepted!");
}
$Email = json_decode(file_get_contents('php://input'), true)['Email'];
$Password = json_decode(file_get_contents('php://input'), true)['Password'];
if (empty($Email)) {
    response("Email is required!");
}

if (empty($Password)) {
    response("Password is required!");
}


$Password = md5($Password);

$pdo = getPDO();

// Check if the user exists
$query = "SELECT * FROM users WHERE Email = :Email AND Password = :Password";
$stmt = $pdo->prepare($query);
$stmt->bindParam(":Email", $Email, PDO::PARAM_STR);
$stmt->bindParam(":Password", $Password, PDO::PARAM_STR);
$stmt->execute();

if ($stmt->rowCount() > 0) {
    $Token = uniqid(rand());

    $updateQuery = "UPDATE users SET token = :Token WHERE Email = :Email AND Password = :Password";
    $updateStmt = $pdo->prepare($updateQuery);
    $updateStmt->bindParam(":Token", $Token, PDO::PARAM_STR);
    $updateStmt->bindParam(":Email", $Email, PDO::PARAM_STR);
    $updateStmt->bindParam(":Password", $Password, PDO::PARAM_STR);
    $updateStmt->execute();

    response("login Successful", true,$Token);
} else {
    response("Invalid username or password");
}
?>