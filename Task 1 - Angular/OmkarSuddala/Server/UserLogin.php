<?php

require("./utils/connection.php");

// if ($_SERVER["REQUEST_METHOD"] != "POST") {
//     sendResponse(false, "Invalid request method");
// }

$input_data = file_get_contents("php://input");

// Decode the JSON data
$data = json_decode($input_data);




if (empty($data->email)) {
    sendResponse(false, "Email is required");
}
if (empty($data->password)) {
    sendResponse(false, "Password is required");
}

$email = $data->email;
$password = md5($data->password);
$pdo = connect();

$query = "SELECT * FROM userdetailes WHERE email = :email   AND password = :password";
$stmt = $pdo->prepare($query);
$stmt->bindParam("email", $email, PDO::PARAM_STR);
$stmt->bindParam("password", $password, PDO::PARAM_STR);

$stmt->execute();
if ($stmt->rowCount() == 0) {
    sendResponse(false, "Email or Password is incorrect!");
}

$token = generateToken($pdo);
$query = "UPDATE userdetailes SET token = :token WHERE email = :email AND password = :password";
$stmt = $pdo->prepare($query);
$stmt->bindParam("token", $token, PDO::PARAM_STR);
$stmt->bindParam("email", $email, PDO::PARAM_STR);
$stmt->bindParam("password", $password, PDO::PARAM_STR);
$stmt->execute();

if ($stmt->rowCount() > 0) {

    sendResponse(true, "Successfully Logged In", ["token" => $token]);
}

sendResponse(false, "Can't Login, Please try again!");
