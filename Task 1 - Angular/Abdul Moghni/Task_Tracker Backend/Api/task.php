<?php

include_once("../Database-connection/cors.php");
require_once("../Database-connection/dbconnection.php");
require_once("../Database-connection/functions.php");


if ($_SERVER["REQUEST_METHOD"] != "POST") {
    response("Only POST method accepted!");
}


$Token=json_decode(file_get_contents('php://input'), true)['Token'];

$Task_Name=json_decode(file_get_contents('php://input'), true)['Task_Name'];
$Category=json_decode(file_get_contents('php://input'), true)['Category'];
$Priority=json_decode(file_get_contents('php://input'), true)['Priority'];
$Task_Description=json_decode(file_get_contents('php://input'), true)['Task_Description'];
$Deadline=json_decode(file_get_contents('php://input'), true)['Deadline'];
$Task_Status=json_decode(file_get_contents('php://input'), true)['Task_Status'];
if (empty($Token)) {
    response("Token is required!");
}
if(empty($Task_Name)){
    response("Task name is required!");
}




$pdo = getPDO();



$query = "SELECT * FROM users where token = :token ";
$stmt = $pdo->prepare($query);
$stmt->bindParam(":token", $Token);
$stmt->execute();


$user = $stmt->fetch(PDO::FETCH_ASSOC);

$key= $user["email"];

$query = "SELECT * FROM task where email = :key and task_name = :Task_Name ";
$stmt = $pdo->prepare($query);
$stmt->bindParam(":key", $key);
$stmt->bindParam(":Task_Name", $Task_Name);
$stmt->execute();

if ($stmt->rowCount() != 0) {
    $query = "UPDATE task
    SET task_name = :Task_Name, category = :Category, priority = :Priority, task_description = :Task_Description, deadline = :Deadline, task_status = :Task_Status
    WHERE task_name = :Task_Name AND email = :key
    ";
    $stmt = $pdo->prepare($query);
    $stmt->bindParam(":Task_Name", $Task_Name);
    $stmt->bindParam(":Category", $Category);
    $stmt->bindParam(":Priority", $Priority);
    $stmt->bindParam(":Task_Description", $Task_Description);
    $stmt->bindParam(":Deadline", $Deadline);
    $stmt->bindParam(":Task_Status", $Task_Status);
    $stmt->bindParam(":key", $key);
    $stmt->execute();
    if ($stmt->rowCount() != 0){
        response("Task updated successfully", true);
    }
    else{
        response("Error in task updation", false);
    }
} else {
    $query = "INSERT INTO task (task_name, category, priority, task_description, deadline, task_status, email)
          VALUES (:Task_Name, :Category, :Priority, :Task_Description, :Deadline, :Task_Status, :Email)";
    $stmt = $pdo->prepare($query);
    $stmt->bindParam(":Task_Name", $Task_Name);
    $stmt->bindParam(":Category", $Category);
    $stmt->bindParam(":Priority", $Priority);
    $stmt->bindParam(":Task_Description", $Task_Description);
    $stmt->bindParam(":Deadline", $Deadline);
    $stmt->bindParam(":Task_Status", $Task_Status);
    $stmt->bindParam(":Email", $key);
    $stmt->execute();
    if ($stmt->rowCount() != 0){
        response("Task inserted successfully", true);
    }
    else{
        response("Error in task insertion", false);
    }
}
?>