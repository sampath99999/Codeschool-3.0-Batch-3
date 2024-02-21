
<?php

require("./utils/connection.php");

$pdo = connect();

$taskid = json_decode(file_get_contents('php://input'), true)['taskid'];
// $priority = json_decode(file_get_contents('php://input'), true)['priority'];
// $deadline = json_decode(file_get_contents('php://input'), true)['deadline'];
// $description = json_decode(file_get_contents('php://input'), true)['description'];
// $userid = json_decode(file_get_contents('php://input'), true)['userid'];
$status = json_decode(file_get_contents('php://input'), true)['status'];




// function test_input($data)
// {
//     $data = trim($data);
//     $data = stripslashes($data);
//     $data = htmlspecialchars($data);
//     return $data;
// }





$query = "UPDATE tasks SET status = :status WHERE taskid = :taskid";


$stmt = $pdo->prepare($query);
$stmt->bindParam("taskid", $taskid, PDO::PARAM_INT);
$stmt->bindParam("status", $status, PDO::PARAM_STR);

$stmt->execute();
if ($stmt->rowCount() > 0) {
    sendResponse(true, "Task Updated successfully");
} else {
    sendResponse(false, "Task updating failed");
}
