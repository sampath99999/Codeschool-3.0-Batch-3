
<?php

require("./utils/connection.php");

$pdo = connect();
$token = json_decode(file_get_contents('php://input'), true)['token'];


$query = "SELECT COUNT(*)
FROM tasks t
JOIN userdetailes u ON t.userid = u.userid
WHERE  u.token = :token";

$stmt = $pdo->prepare($query);
$stmt->bindParam("token", $token, PDO::PARAM_STR);
$query1 = "SELECT COUNT(*)
FROM tasks t
JOIN userdetailes u ON t.userid = u.userid
WHERE t.status ='To Do' AND u.token = :token";

$stmt1 = $pdo->prepare($query1);
$stmt1->bindParam("token", $token, PDO::PARAM_STR);

$query2 = "SELECT COUNT(*)
FROM tasks t 
JOIN userdetailes u ON t.userid = u.userid
WHERE t.status ='In Progress' AND u.token = :token";

$stmt2 = $pdo->prepare($query2);
$stmt2->bindParam("token", $token, PDO::PARAM_STR);
$query3 = "SELECT COUNT(*)
FROM tasks t
JOIN userdetailes u ON t.userid = u.userid
WHERE t.status ='Completed' AND u.token = :token";

$stmt3 = $pdo->prepare($query3);
$stmt3->bindParam("token", $token, PDO::PARAM_STR);





$stmt->execute();
$stmt1->execute();
$stmt2->execute();
$stmt3->execute();




if ($stmt->rowCount() >= 0 && $stmt1->rowCount() >= 0 && $stmt2->rowCount() >= 0 && $stmt3->rowCount() >= 0) {
    $result = $stmt->fetch(PDO::FETCH_ASSOC);
    $result1 = $stmt1->fetch(PDO::FETCH_ASSOC);
    $result2 = $stmt2->fetch(PDO::FETCH_ASSOC);
    $result3 = $stmt3->fetch(PDO::FETCH_ASSOC);

    sendResponse(true, "Success", ["result" => $result, "result1" => $result1, "result2" => $result2, "result3" => $result3]);
} else {
    sendResponse(false, "Task  failed");
}
