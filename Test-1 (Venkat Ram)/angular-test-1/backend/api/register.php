<?php

require_once("../includes/dbconnect.php");
require_once("../includes/response.php");
require_once("../includes/corshandler.php");

$email = json_decode(file_get_contents('php://input'), true)['email'];
$password = json_decode(file_get_contents('php://input'), true)['password'];
$username = json_decode(file_get_contents('php://input'), true)['username'];

if (empty($email)) {
    response(false, "Enter e-mail address", null);
}

if (empty($password)) {
    response(false, "Enter password", null);
}

if (strlen($password) < 6) {
    response(false, "Password: Minimum 6 Characters; Maximum 12 Characters");
}


$status = true;

// Database Entry

try {
    $stmt1 = $pdo->prepare("select * from users where email=?");
    $stmt1->execute([$email]);
    $result = $stmt1->fetchAll(PDO::FETCH_ASSOC);

    if (count($result) != 0) {
        response(true, "Record Exists!", $result);
    }

    $stmt2 = $pdo->prepare("insert into users (user_type_id, username, email, password) values (?,?,?,?); ");
    $stmt2->execute([1, $username, $email, $password]);

    response(true, "Signed Up Successfully!", null);
} catch (PDOException $e) {
    response(false, "{$e->getMessage()}");
}
