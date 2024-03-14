<?php

include_once("../includes/corshandler.php");
require_once("../includes/dbconnect.php");
require_once("../includes/response.php");

$email = json_decode(file_get_contents('php://input'), true)['email'];
$password = json_decode(file_get_contents('php://input'), true)['password'];

if (empty($email)) {
    response(false, "Enter e-mail address", null);
}

if (empty($password)) {
    response(false, "Enter password", null);
}

if (strlen($email) > 30) {
    response(false, "Please Enter a Valid e-Mail");
} else if (preg_match('/[\'{#~?><>,|=_^£$%&*()}+¬-]/', $email)) {
    response(false, "Please Enter a Valid e-Mail, containing just one @");
}

if (strlen($password) < 6) {
    response(false, "Password: Minimum 6 Characters; Maximum 12 Characters");
}

$status = true;

try {
    $query = "SELECT * FROM users WHERE email = :email AND password = :password";
    $stmt = $pdo->prepare($query);
    $stmt->bindParam(":email", $email, PDO::PARAM_STR);
    $stmt->bindParam(":password", $password, PDO::PARAM_STR);
    $stmt->execute();

    if ($stmt->rowCount() > 0) {
        $token = uniqid(rand());
        $updateQuery = "UPDATE users SET token = :token WHERE email = :email AND password = :password";
        $updateStmt = $pdo->prepare($updateQuery);
        $updateStmt->bindParam(":token", $token, PDO::PARAM_STR);
        $updateStmt->bindParam(":email", $email, PDO::PARAM_STR);
        $updateStmt->bindParam(":password", $password, PDO::PARAM_STR);
        $updateStmt->execute();

        $query2 = "select username, user_type_id from users where email = :email;";
        $stmt = $pdo->prepare($query2);
        $stmt->bindParam(":email", $email, PDO::PARAM_STR);
        $stmt->execute();
        $result = $stmt->fetchAll(PDO::FETCH_ASSOC);

        response(true, "Signed In Successfully!", [$token, $result]);
    } else {
        response("Invalid username or password");
    }
} catch (PDOException $e) {
    response(false, "{$e->getMessage()}");
}
