
<?php

require("./utils/connection.php");

$pdo = connect();

$taskname = json_decode(file_get_contents('php://input'), true)['taskname'];
$category = json_decode(file_get_contents('php://input'), true)['category'];
$priority = json_decode(file_get_contents('php://input'), true)['priority'];
$deadline = json_decode(file_get_contents('php://input'), true)['deadline'];
$description = json_decode(file_get_contents('php://input'), true)['description'];
$userid = json_decode(file_get_contents('php://input'), true)['userid'];

if (empty($taskname)) {
    sendResponse(false, "Task name is required");
}
if (empty($category)) {
    sendResponse(false, "category is required");
}
if (empty($priority)) {
    sendResponse(false, "Priority is required");
}
if (empty($deadline)) {
    sendResponse(false, "Deadline is required");
}
if (empty($description)) {
    sendResponse(false, "Description is required");
}


// function test_input($data)
// {
//     $data = trim($data);
//     $data = stripslashes($data);
//     $data = htmlspecialchars($data);
//     return $data;
// }







$query = "INSERT INTO tasks(taskname,category,priority,description,deadline,userid) VALUES(:taskname,:category,:priority,:description,:deadline,:userid)";
$stmt = $pdo->prepare($query);
$stmt->bindParam("taskname", $taskname, PDO::PARAM_STR);
$stmt->bindParam("category", $category, PDO::PARAM_STR);
$stmt->bindParam("priority", $priority, PDO::PARAM_STR);
$stmt->bindParam("deadline", $deadline, PDO::PARAM_STR);
$stmt->bindParam("description", $description, PDO::PARAM_STR);
$stmt->bindParam("userid", $userid, PDO::PARAM_INT);
$stmt->execute();
if ($stmt->rowCount() > 0) {
    sendResponse(true, "Task Created successfully");
} else {
    sendResponse(false, "Task creation failed");
}
