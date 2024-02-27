<?php

require("./utils/connection.php");
require("./cors.php");


// if ($_SERVER["REQUEST_METHOD"] != "POST") {
//     sendResponse(false, "Invalid request method");
// }
$input_data = file_get_contents("php://input");

// Decode the JSON data
$data = json_decode($input_data);

if (!isset($data->token)) {
    http_response_code(400);
    response(false, "token is required");
}

$token = $data->token;
$pdo = connect();
$query = "SELECT u.username,t.task_id,
u.user_id,
t.task_name, t.category, t.priority, t.description, t.deadline, t.status
 FROM users u join tasks t on u.user_id=t.user_id WHERE u.token = :token";
$stmt = $pdo->prepare($query);
$stmt->bindParam("token", $token, PDO::PARAM_STR);
$stmt->execute();





if ($stmt->rowCount() >= 0) {
    $Tasks = $stmt->fetchAll(PDO::FETCH_ASSOC);
    response(true, "Success", ["tasks" => $Tasks]);
}

http_response_code(401);
response(false, "Please Log In again!");
