<?php

require_once("../includes/corshandler.php");
require_once("../includes/dbconnect.php");
require_once("../includes/response.php");

if ($_SERVER["REQUEST_METHOD"] != "POST") {
    response(false, "Only POST method accepted!");
}

$token = json_decode(file_get_contents('php://input'), true)["token"];

try {
    $query = "SELECT * FROM users where token = :token ";
    $stmt = $pdo->prepare($query);
    $stmt->bindParam(":token", $token);
    $stmt->execute();

    $user = $stmt->fetch(PDO::FETCH_ASSOC);

    $id = $user["id"];

    $query = "SELECT * FROM claim join users where claim.user_id = :id and users.id= :id";
    $stmt = $pdo->prepare($query);
    $stmt->bindParam(":id", $id);
    $stmt->execute();
    $display = $stmt->fetchall(PDO::FETCH_ASSOC);
    response(true, "Success!", $display);
} catch (PDOException $e) {
    response(false, "{$e->getMessage()}");
}
