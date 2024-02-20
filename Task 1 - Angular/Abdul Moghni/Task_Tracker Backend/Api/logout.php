<?php
include_once("../Database-connection/cors.php");
require_once("../Database-connection/dbconnection.php");
require_once("../Database-connection/functions.php");

if ($_SERVER["REQUEST_METHOD"] != "POST") {
    response("Only POST method accepted!");
}
$Token=json_decode(file_get_contents('php://input'), true)['Token'];
if (empty($Token)) {
    response("Token is required!");
}


$value = ""; // Assuming you want to empty the token

$pdo = getPDO();

// Check if the user exists
$query = "UPDATE Users
SET token = :value
WHERE token = :Token";
$stmt = $pdo->prepare($query);
$stmt->bindParam(":value", $value, PDO::PARAM_STR);
$stmt->bindParam(":Token", $Token, PDO::PARAM_STR);
$stmt->execute();

if ($stmt->rowCount() > 0) {
    response("Logout Successful", true);
} else {
    response("Invalid token");
}
?>