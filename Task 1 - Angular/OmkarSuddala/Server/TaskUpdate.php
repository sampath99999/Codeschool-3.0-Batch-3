
<?php

require("./utils/connection.php");

$pdo = connect();

$taskid = json_decode(file_get_contents('php://input'), true)['taskid'];
// $priority = json_decode(file_get_contents('php://input'), true)['priority'];
// $deadline = json_decode(file_get_contents('php://input'), true)['deadline'];
// $description = json_decode(file_get_contents('php://input'), true)['description'];
// $userid = json_decode(file_get_contents('php://input'), true)['userid'];




// function test_input($data)
// {
//     $data = trim($data);
//     $data = stripslashes($data);
//     $data = htmlspecialchars($data);
//     return $data;
// }


$query = "Delete  from  tasks WHERE taskid = :taskid";
$stmt = $pdo->prepare($query);
$stmt->bindParam("taskid", $taskid, PDO::PARAM_INT);

$stmt->execute();
if ($stmt->rowCount() > 0) {
    sendResponse(true, "Task deleted successfully");
} else {
    sendResponse(false, "Task deleting failed");
}

function countRecords()
{
    $pdo = connect();
    $userid = json_decode(file_get_contents('php://input'), true)['userid'];

    $query = "SELECT COUNT(status)
FROM tasks  where  t.status = 'To Do' && userid=:userid";
    $stmt = $pdo->prepare($query);
    $stmt->bindParam("userid", $userid, PDO::PARAM_INT);

    $stmt->execute();
    if ($stmt->rowCount() > 0) {
        $result = $stmt->fetch();
        sendResponse(true, "Task deleted successfully", $result);
    } else {
        sendResponse(false, "Task deleting failed");
    }
}
