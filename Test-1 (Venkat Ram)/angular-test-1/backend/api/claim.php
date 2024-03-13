<?php

require_once("../includes/corshandler.php");
require_once("../includes/dbconnect.php");
require_once("../includes/response.php");


$token = json_decode(file_get_contents('php://input'), true)["token"];
$name = json_decode(file_get_contents('php://input'), true)["name"];
$amt = json_decode(file_get_contents('php://input'), true)["amt"];
$from = json_decode(file_get_contents('php://input'), true)["from"];
$to = json_decode(file_get_contents('php://input'), true)["to"];
$modeOfTravel = json_decode(file_get_contents('php://input'), true)["modeOfTravel"];
$ownership = json_decode(file_get_contents('php://input'), true)["ownership"];
$airTicket = json_decode(file_get_contents('php://input'), true)["airTicket"];
$railTicket = json_decode(file_get_contents('php://input'), true)["railTicket"];
$railClass = json_decode(file_get_contents('php://input'), true)["railClass"];


try{
    $query = "SELECT * FROM users where token = :token;";
    $stmt = $pdo->prepare($query);
    $stmt->bindParam(":token", $token);
    $stmt->execute();

    $user = $stmt->fetch(PDO::FETCH_ASSOC);
    $id = $user["id"];


    $query = "SELECT * FROM claim where user_id = :id and name = :name;";
    $stmt = $pdo->prepare($query);
    $stmt->bindParam(":id", $id);
    $stmt->bindParam(":name", $name);
    $stmt->execute();

if ($stmt->rowCount() != 0) {
    $query = "UPDATE claim SET name = :name, claim_from = :from, claim_to = :to, amt = :amt, mot = :modeOfTravel, ownership = :ownership, at = :airTicket, rt = :railTicket, rc = :railClass WHERE name = :name AND user_id = :id;";
    $stmt = $pdo->prepare($query);
    $stmt->bindParam(":name", $name);
    $stmt->bindParam(":from", $from);
    $stmt->bindParam(":to", $to);
    $stmt->bindParam(":amt", $amt);
    $stmt->bindParam(":modeOfTravel", $modeOfTravel);
    $stmt->bindParam(":ownership", $ownership);
    $stmt->bindParam(":airTicket", $airTicket);
    $stmt->bindParam(":railTicket", $railTicket);
    $stmt->bindParam(":railClass", $railClass);
    $stmt->bindParam(":name", $name);
    $stmt->bindParam(":id", $id);
    $stmt->execute();

    if ($stmt->rowCount() != 0){
        response(true, "Claim updated successfully", null);
    }
    else{
        response(false, "Error in claim updation", null);
    }
    } else {
        $query = "INSERT INTO claim (name, claim_from, claim_to, amt, mot, ownership, at, rt, rc, user_id) VALUES (:name, :claim_from, :claim_to, :amt, :modeOfTravel, :ownership, :airTicket, :railTicket, :railClass, :id)";
        $stmt = $pdo->prepare($query);
        $stmt->bindParam(":name", $name);
        $stmt->bindParam(":claim_from", $from);
        $stmt->bindParam(":claim_to", $to);
        $stmt->bindParam(":amt", $amt);
        $stmt->bindParam(":modeOfTravel", $modeOfTravel);
        $stmt->bindParam(":ownership", $ownership);
        $stmt->bindParam(":airTicket", $airTicket);
        $stmt->bindParam(":railTicket", $railTicket);
        $stmt->bindParam(":railClass", $railClass);
        $stmt->bindParam(":id", $id);
        $stmt->execute();
        if ($stmt->rowCount() != 0){
            response(true, "Claim inserted successfully", null);
        }
        else{
            response(false, "Error in claim insertion", null);
        }
    }
} catch (PDOException $e) {
    response(false, "{$e->getMessage()}");
}
?>