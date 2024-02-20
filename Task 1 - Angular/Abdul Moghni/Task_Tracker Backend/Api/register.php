<?php
 

include_once("../Database-connection/cors.php");
require_once("../Database-connection/dbconnection.php");
require_once("../Database-connection/functions.php");


//Validation of the required field
if($_SERVER["REQUEST_METHOD"] != "POST"){
    response("Only POST method accepted!");
}
$Email = json_decode(file_get_contents('php://input'), true)['Email'];
$Password = json_decode(file_get_contents('php://input'), true)['Password'];
$Name=json_decode(file_get_contents('php://input'), true)['Name'];
$User_Bio=json_decode(file_get_contents('php://input'), true)['User_Bio'];
if(empty($Name)){
    response("Name is required!");
}



if(empty($Email)){
    response("Email is required!");
}
if(empty($Password)){
    response("Password is required!");
}

if(empty($User_Bio)){
    response("Bio is required!");
}





//checking the validation of the Assigned varriable



if(!filter_var($Email, FILTER_VALIDATE_EMAIL)){
    response ("please Enter valid email ",false);
}

if((strlen($Password) < 6) ||(!preg_match('/[A-Z]/', $Password)) || (!preg_match('/[a-z]/', $Password)) ||(!preg_match('/[0-9]/', $Password))||(!preg_match('/[!@#$%^&*()_+{}[\]:;<>,.?~\\-]/', $Password))){
    response("please enter the valid password",false);
}

//Applying message digest encryption
$Password=md5($Password);

//storing getpdo into pdo
$pdo = getPDO();

// // Email Already exists
$query = "SELECT * FROM users WHERE email = :Email";
$stmt = $pdo->prepare($query);
$stmt->bindParam("Email", $Email, PDO::PARAM_STR);
$stmt->execute();

if($stmt->rowCount()  > 0){
    response("Email already exists");
}

//Inserting querry to insert the data into database
$query = "INSERT INTO users (email,name,password,bio) VALUES (:Email,:Name ,:Password,:User_Bio)";

$stmt = $pdo->prepare($query);
$stmt->bindParam("Email", $Email, PDO::PARAM_STR);
$stmt->bindParam("Name", $Name, PDO::PARAM_STR);
$stmt->bindParam("Password", $Password, PDO::PARAM_STR);
$stmt->bindParam("User_Bio", $User_Bio, PDO::PARAM_STR);
$stmt->execute();

// $query="Select * from Register";
// $stmt = $pdo->prepare($query);
// echo json_encode($stmt->execute());


//checking that row is insert or not 

if($stmt->rowCount() != 0){
    response("Registered Successfully!", true);
}

response("Something went wrong!"); 




?>