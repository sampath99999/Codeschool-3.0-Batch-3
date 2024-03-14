<?php

require_once("../includes/corshandler.php");
require_once("../includes/dbconnect.php");
require_once("../includes/response.php");

if ($_SERVER["REQUEST_METHOD"] != "POST") {
    response(false, "Only POST method accepted!");
}

$token = json_decode(file_get_contents('php://input'), true)["token"];

try {

    $query = "SELECT * FROM donors;";
    $stmt = $pdo->prepare($query);
    $stmt->execute();
    $result = $stmt->fetchall(PDO::FETCH_ASSOC);
    response(true, "Success!", $result);
    
} catch (PDOException $e) {
    response(false, "{$e->getMessage()}");
}
