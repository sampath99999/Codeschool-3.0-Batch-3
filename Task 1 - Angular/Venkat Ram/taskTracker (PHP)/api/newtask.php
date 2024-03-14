<?php

require_once("../includes/corshandler.php");
require_once("../includes/dbconnect.php");
require_once("../includes/response.php");


$token = json_decode(file_get_contents('php://input'), true)["token"];
$taskName = json_decode(file_get_contents('php://input'), true)["taskName"];
$category = json_decode(file_get_contents('php://input'), true)["category"];
$priority = json_decode(file_get_contents('php://input'), true)["priority"];
$taskDesc = json_decode(file_get_contents('php://input'), true)["taskDesc"];
$deadline = json_decode(file_get_contents('php://input'), true)["deadline"];
$taskStatus = json_decode(file_get_contents('php://input'), true)["taskStatus"];


try{
    $query = "SELECT * FROM users where token = :token;";
    $stmt = $pdo->prepare($query);
    $stmt->bindParam(":token", $token);
    $stmt->execute();

    $user = $stmt->fetch(PDO::FETCH_ASSOC);
    $id = $user["id"];

    $query = "SELECT * FROM task where user_id = :id and task_name = :taskName;";
    $stmt = $pdo->prepare($query);
    $stmt->bindParam(":id", $id);
    $stmt->bindParam(":taskName", $taskName);
    $stmt->execute();

if ($stmt->rowCount() != 0) {
    $query = "UPDATE task SET task_name = :taskName, category = :category, priority = :priority, description = :taskDesc, deadline = :deadline, status = :taskStatus WHERE task_name = :taskName AND user_id = :id;";
    $stmt = $pdo->prepare($query);
    $stmt->bindParam(":taskName", $taskName);
    $stmt->bindParam(":category", $category);
    $stmt->bindParam(":priority", $priority);
    $stmt->bindParam(":taskDesc", $taskDesc);
    $stmt->bindParam(":deadline", $deadline);
    $stmt->bindParam(":taskStatus", $taskStatus);
    $stmt->bindParam(":id", $id);
    $stmt->execute();
    if ($stmt->rowCount() != 0){
        response(true, "Task updated successfully", null);
    }
    else{
        response(false, "Error in task updation", null);
    }
    } else {
        $query = "INSERT INTO task (task_name, category, priority, description, deadline, status, user_id) VALUES (:taskName, :category, :priority, :taskDesc, :deadline, :taskStatus, :id)";
        $stmt = $pdo->prepare($query);
        $stmt->bindParam(":taskName", $taskName);
        $stmt->bindParam(":category", $category);
        $stmt->bindParam(":priority", $priority);
        $stmt->bindParam(":taskDesc", $taskDesc);
        $stmt->bindParam(":deadline", $deadline);
        $stmt->bindParam(":taskStatus", $taskStatus);
        $stmt->bindParam(":id", $id);
        $stmt->execute();
        if ($stmt->rowCount() != 0){
            response(true, "Task inserted successfully", null);
        }
        else{
            response(false, "Error in task insertion", null);
        }
    }
} catch (PDOException $e) {
    response(false, "{$e->getMessage()}");
}

?>