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






$pdo = getPDO();



$query = "SELECT * FROM users where token = :token ";
$stmt = $pdo->prepare($query);
$stmt->bindParam(":token", $Token);
$stmt->execute();


$user = $stmt->fetch(PDO::FETCH_ASSOC);

$key= $user["email"];
$query = "SELECT * FROM task where email = :key";
$stmt = $pdo->prepare($query);
$stmt->bindParam(":key", $key);
$stmt->execute();
$Display_Task = $stmt->fetchAll(PDO::FETCH_ASSOC);

response("Displaying task successfully",true,$Display_Task);