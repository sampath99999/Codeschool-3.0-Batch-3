<?php

require("./utils/connection.php");

// if ($_SERVER["REQUEST_METHOD"] != "POST") {
//     sendResponse(false, "Invalid request method");
// }
$input_data = file_get_contents("php://input");

// Decode the JSON data
$data = json_decode($input_data);

if (!isset($data->token)) {
    http_response_code(400);
    sendResponse(false, "Token is required");
}

$token = $data->token;
$pdo = connect();
$query = "SELECT * FROM userdetailes WHERE token = :token";
$stmt = $pdo->prepare($query);
$stmt->bindParam("token", $token, PDO::PARAM_STR);
$stmt->execute();





if ($stmt->rowCount() > 0) {
    $user = $stmt->fetch(PDO::FETCH_ASSOC);
    sendResponse(true, "Success", ["user" => $user]);
}

http_response_code(401);
sendResponse(false, "Please Log In again!");
