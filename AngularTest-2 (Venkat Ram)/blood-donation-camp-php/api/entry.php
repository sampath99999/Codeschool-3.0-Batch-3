<?php

require_once("../includes/dbconnect.php");
require_once("../includes/response.php");
require_once("../includes/corshandler.php");

$name = json_decode(file_get_contents('php://input'), true)['name'];
$email = json_decode(file_get_contents('php://input'), true)['email'];
$phoneNumber = json_decode(file_get_contents('php://input'), true)['phoneNumber'];
$bloodGroup = json_decode(file_get_contents('php://input'), true)['bloodGroup'];
$conditions = json_decode(file_get_contents('php://input'), true)['conditions'];
$age = json_decode(file_get_contents('php://input'), true)['age'];
$city = json_decode(file_get_contents('php://input'), true)['city'];

if (empty($name)) {
    response(false, "Enter username", null);
}

if (empty($email)) {
    response(false, "Enter e-mail address", null);
}

if (empty($phoneNumber)) {
    response(false, "Enter password", null);
}

if (empty($bloodGroup)) {
    response(false, "Enter blood group", null);
}

if (empty($conditions)) {
    response(false, "Enter password", null);
}

if (empty($age)) {
    response(false, "Enter age", null);
}

if (empty($city)) {
    response(false, "Enter city", null);
}

$status = true;

try {
    $query = "SELECT * FROM users where email = :email;";
    $stmt = $pdo->prepare($query);
    $stmt->bindParam(":email", $email);
    $stmt->execute();

    $user = $stmt->fetch(PDO::FETCH_ASSOC);
    $id = $user["id"];
    
    $stmt1 = $pdo->prepare("select * from donors where email=? and name=? and blood_group=?");
    $stmt1->execute([$email, $name, $bloodGroup]);
    $result = $stmt1->fetchAll(PDO::FETCH_ASSOC);

    if ($result) {
        response(false, "Donor already exists!", $result);
    } else{
        $stmt2 = $pdo->prepare("insert into donors (donor_id, name, email, phone_number, blood_group, medical_conditions, age, city) values (?,?,?,?,?,?,?,?);");
        $stmt2->execute([$id, $name, $email, $phoneNumber, $bloodGroup, $conditions, $age, $city]);
    
        response(true, "Signed Up as a Donor Successfully!", null);
    }

} catch (PDOException $e) {
    response(false, "{$e->getMessage()}");
}
