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
    sendResponse(false, "token is required");
}

$token = $data->token;
$pdo = connect();
$query = "SELECT u.username,t.taskid,
u.userid,
t.taskname, t.category, t.priority, t.description, t.deadline, t.status
 FROM userdetailes u join tasks t on u.userid=t.userid WHERE u.token = :token";
$stmt = $pdo->prepare($query);
$stmt->bindParam("token", $token, PDO::PARAM_STR);
$stmt->execute();





if ($stmt->rowCount() >= 0) {
    $Tasks = $stmt->fetchAll(PDO::FETCH_ASSOC);
    sendResponse(true, "Success", ["tasks" => $Tasks]);
}

http_response_code(401);
sendResponse(false, "Please Log In again!");
