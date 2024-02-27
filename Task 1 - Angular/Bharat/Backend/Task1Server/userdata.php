<?php

require("./utils/connection.php");
require("./cors.php");


$input_data = file_get_contents("php://input");


$data = json_decode($input_data);

if (!isset($data->token)) {
    http_response_code(400);
    response(false, "Token is required");
}

$token = $data->token;
$pdo = connect();
$query = "SELECT * FROM users WHERE token = :token";
$stmt = $pdo->prepare($query);
$stmt->bindParam("token", $token, PDO::PARAM_STR);
$stmt->execute();





if ($stmt->rowCount() > 0) {
    $user = $stmt->fetch(PDO::FETCH_ASSOC);
    response(true, "Success", ["user" => $user]);
}

http_response_code(401);
response(false, "Please Log In again!");
