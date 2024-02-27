<?php


require("./utils/connection.php");

$pdo = connect();

$data = json_decode(file_get_contents('php://input'), true);

$task_name = $data['task_name'];
$category = $data['category'];
$priority = $data['priority'];
$deadline = $data['deadline'];
$description = $data['description'];
$status = $data['status'];
$user_id = $data['user_id'];

if (empty($task_name) || empty($category) || empty($priority) || empty($deadline) || empty($status) || empty($description)) {
    response(false, "All fields are required");
}

function test_input($data)
{
    $data = trim($data);
    $data = stripslashes($data);
    $data = htmlspecialchars($data);
    return $data;
}

$query = "INSERT INTO tasks (task_name, category, priority, description,status, deadline, user_id) 
          VALUES (:task_name, :category, :priority, :description, :status,:deadline, :user_id)";
$stmt = $pdo->prepare($query);
$stmt->bindParam(":task_name", $task_name, PDO::PARAM_STR);
$stmt->bindParam(":category", $category, PDO::PARAM_STR);
$stmt->bindParam(":priority", $priority, PDO::PARAM_STR);
$stmt->bindParam(":status", $status, PDO::PARAM_STR);
$stmt->bindParam(":deadline", $deadline, PDO::PARAM_STR);
$stmt->bindParam(":description", $description, PDO::PARAM_STR);
$stmt->bindParam(":user_id", $user_id, PDO::PARAM_INT);


$stmt->execute();

if ($stmt->rowCount() > 0) {
    response(true, "Task Created successfully");
} else {
    response(false, "Task creation failed");
}
