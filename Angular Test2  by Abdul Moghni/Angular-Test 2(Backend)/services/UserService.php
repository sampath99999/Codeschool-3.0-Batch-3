<?php

namespace App\Services;

use App\Providers\Auth;

class UserService
{
    public static function login()
    {
        self::validateFormData();
        $email = $_POST['email'];
        $password = md5($_POST['password']);

        $query = "SELECT user_id,email,role FROM users WHERE ( email = :email) AND password = :password";
        $user = DB->first($query, ["email" => $email, "password" => $password]);
        if (!$user) {
            return response(["message" => "Username or Password incorrect"], 400);
        }
        $token = self::generateToken();
        $query = "UPDATE users SET token = :token WHERE user_id = :id";
        DB->update($query, ["token" => $token, "id" => $user["user_id"]]);
        return response(["message" => "Login Success", "token" => $token, "validator" => "true", "role" => $user["role"], "email" => $user["email"]], 200);
    }

    public static function register()
    {
        self::validateRegisterFormData();


        $email = $_POST['email'];
        $password = md5($_POST['password']);


        $query = "SELECT * FROM users WHERE  email = :email ";
        $user = DB->first($query, ["email" => $email]);
        if ($user) {
            return response(["message" => "User already Existed"], 400);
        }


        $query = "INSERT INTO users (email,password)
VALUES ( :email,:password)";
        $user = DB->insert($query, ["password" => $password, "email" => $email]);


        self::insertDataIntoPersonalInformation();

        self::insertDataIntoContactInformation();


        return response(["message" => "Register Successful", "validator" => "true"], 200);


    }

    public static function logout()
    {
        $user_id = Auth->user()["user_id"];
        $query = "UPDATE users SET token ='' WHERE user_id=:user_id;";
        $update = DB->update($query, ["user_id" => $user_id]);
        if ($update) {
            return response(["message" => "User logout Successfully"], 201);
        }
        return response(["message" => "Un-intended thing happen"], 400);
    }

    public static function getUser()
    {
        $username = Auth->user()["email"];
        $role = Auth->user()["role"];
        if ($username) {
            return response(["data" => $username, "validator" => "true", "role" => $role], 201);
        }
        return response(["message" => "Go Back home do not try to mischieve"], 400);
    }

    public static function deleteUser()
    {
        $username = $_POST['username'];
        $query = "SELECT id FROM users WHERE username = :username";
        $user = DB->delete($query, ["username" => $username]);
        if ($user) {
            $query = "DELETE FROM users WHERE username = :username ";
            $user = DB->delete($query, ["username" => $username]);
            if ($user) {
                return response(["message" => "User Deleted Successfully"], 200);
            }
            return response(["message" => "User not Deleted"], 400);
        }
        return response(["message" => "User not found"], 400);


    }

    public
    static function generateToken()
    {
        $token = bin2hex(random_bytes(32));
        $query = "SELECT user_id FROM users WHERE token = :token";
        $user = DB->first($query, ["token" => $token]);
        if ($user) {
            return self::generateToken();
        }
        return $token;
    }

    public
    static function validateToken()
    {
        $token = $_POST['token'];
        $query = "SELECT * FROM users WHERE token = :token";
        $user = DB->first($query, ["token" => $token]);
        if (!$user) {
            return response(["message" => "Token is invalid"], 400);
        }
        Auth->setUser($user);
    }

    public
    static function validateFormData()
    {
        if (!isset($_POST['email']) || !isset($_POST['password'])) {
            response(["message" => "Email & Password is required"], 400);
        }
    }


    public static function validateRegisterFormData()
    {
        if (!isset($_POST['email'])) {
            response(["message" => "Email  is required"], 400);
        }


        if (!isset($_POST['password'])) {
            response(["message" => "Password  is required"], 400);
        }

        if (!isset($_POST['fullName'])) {
            response(["message" => "Full Name  is required"], 400);
        }

        if (!isset($_POST['dateOfBirth'])) {
            response(["message" => "Date Of Birth  is required"], 400);
        }

        if (!isset($_POST['gender'])) {
            response(["message" => "Gender  is required"], 400);
        }

        if (!isset($_POST['registrationDate'])) {
            response(["message" => "Registration Date  is required"], 400);
        }

        if (!isset($_POST['address'])) {
            response(["message" => "Address  is required"], 400);
        }


        if (!isset($_POST['city'])) {
            response(["message" => "City  is required"], 400);
        }


        if (!isset($_POST['state'])) {
            response(["message" => "State  is required"], 400);
        }

        if (!isset($_POST['pinCode'])) {
            response(["message" => "Pin Code  is required"], 400);
        }

        if (!isset($_POST['pinCode'])) {
            response(["message" => "Pin Code  is required"], 400);
        }

        if (!isset($_POST['mobileNumber'])) {
            response(["message" => "Mobile Number  is required"], 400);
        }


        $password = $_POST['password'];

        $pattern = '/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{8,}$/';

        if (!preg_match($pattern, $password)) {
            response(["message" => "Please enter valid password"], 400);
        }

        $email = $_POST['email'];

        if (!filter_var($email, FILTER_VALIDATE_EMAIL)) {
            response(["message" => "Please enter valid email"], 400);
        }

    }


    public static function insertDataIntoContactInformation()
    {

        $email = $_POST['email'];
        $address = $_POST['address'];
        $city = $_POST['city'];
        $state = $_POST['state'];
        $pinCode = $_POST['pinCode'];
        $mobileNumber = $_POST['mobileNumber'];

        $query = "INSERT INTO contact_information (email,address,city,state,pin_code,mobile_number)
VALUES ( :email,:address,:city,:state,:pinCode,:mobileNumber)";
        $contactInformation = DB->insert($query, ["email" => $email, "address" => $address, "city" => $city, "state" => $state, "pinCode" => $pinCode, "mobileNumber" => $mobileNumber]);
    }

    public static function insertDataIntoPersonalInformation()
    {
        $email = $_POST['email'];
        $fullName = $_POST['fullName'];
        $dateOfBirth = $_POST['dateOfBirth'];
        $gender = $_POST['gender'];
        $registrationDate = $_POST['registrationDate'];


        $query = "INSERT INTO personal_information (full_name,date_of_birth,gender,email,registration_date)
VALUES ( :fullName,:dateOfBirth,:gender,:email,:registrationDate)";
        $personalInformation = DB->insert($query, ["fullName" => $fullName, "dateOfBirth" => $dateOfBirth, "gender" => $gender, "email" => $email, "registrationDate" => $registrationDate]);
    }


    public static function adminTableDetail()
    {

        $role = Auth->user()["role"];
        if ($role == "admin") {
            $querry = "SELECT 
            pi.aadhaar_number,
            pi.full_name,
            pi.date_of_birth,
            pi.gender,
            pi.email AS personal_email,
            pi.registration_date,
            ci.email AS contact_email,
            ci.address,
            ci.city,
            ci.state,
            ci.pin_code,
            ci.mobile_number
            FROM 
             personal_information pi
            JOIN 
             contact_information ci ON pi.email = ci.email;


            ";

            $data = DB->displayall($querry);
            response(["data" => $data], 200);
        }
        response(["message" => "you don't have rights"], 500);

    }

    public static function deleteUserThroughAdmin(){
        $role = Auth->user()["role"];
        $email=$_POST['email'];
        if($email!="") {
            if ($role == 'admin') {
                $query="Delete from contact_information where email=:email";
                $updated=DB->delete($query, ["email" => $email]);
                self::deleteUserPersonalInformation();
                self::deleteUserInformation();
                response(["message"=>"user deleted successfully","validator"=>"true"],200);

            }
        }
    }

    public static function deleteUserPersonalInformation(){
        $email=$_POST['email'];
        $query="Delete  from personal_information where email=:email";
        $updated=DB->delete($query, ["email" => $email]);
    }

    public static function deleteUserInformation(){
        $email=$_POST['email'];
        $query="Delete from users where email=:email";
        $updated=DB->delete($query, ["email" => $email]);
    }

    public static function displaySelectedUserProfile(){
        $role = Auth->user()["role"];
        $email=$_POST['email'];
        if($email!="") {
            if ($role == 'admin') {
                $querry = "SELECT 
            pi.aadhaar_number,
            pi.full_name,
            pi.date_of_birth,
            pi.gender,
            pi.email AS personal_email,
            pi.registration_date,
            ci.email AS contact_email,
            ci.address,
            ci.city,
            ci.state,
            ci.pin_code,
            ci.mobile_number
            FROM 
             personal_information pi
            JOIN 
             contact_information ci ON pi.email = ci.email
where pi.email=:email;

            ";
                $data=DB->select($querry, ["email" => $email]);

                response(["data"=>$data],200);

            }
        }
    }




    public static function displayUserProfile(){
        $role = Auth->user()["role"];
        $email=Auth->user()["email"];
        if($email!="") {
            if ($role == 'user') {
                $querry = "SELECT 
            pi.aadhaar_number,
            pi.full_name,
            pi.date_of_birth,
            pi.gender,
            pi.email AS personal_email,
            pi.registration_date,
            ci.email AS contact_email,
            ci.address,
            ci.city,
            ci.state,
            ci.pin_code,
            ci.mobile_number
            FROM 
             personal_information pi
            JOIN 
             contact_information ci ON pi.email = ci.email
where pi.email=:email;

            ";
                $data=DB->select($querry, ["email" => $email]);

                response(["data"=>$data],200);

            }
        }
    }

    public static function updateUserProfile(){
        $email=Auth->user()["email"];
        $role=Auth->user()["role"];
        $emailOfUser=$_POST['email'];
        $address=$_POST['address'];
        $city=$_POST['city'];
        $state=$_POST['state'];
        $pinCode=$_POST['pinCode'];
        $mobileNumber=$_POST['mobileNumber'];
        if($role=='user') {
            if ($address == "") {
                response(["message" => "Address is Required"], 500);
            }
            if ($city == "") {
                response(["message" => "City is Required"], 500);
            }

            if ($state == "") {
                response(["message" => "State is Required"], 500);
            }

            if ($pinCode == "") {
                response(["message" => "Pin Code is Required"], 500);
            }

            if ($mobileNumber == "") {
                response(["message" => "Mobile Number is Required"], 500);
            }

            $query="UPDATE contact_information
SET address = :address, city=:city,state=:state,pin_code=:pinCode,mobile_number=:mobileNumber
WHERE email = :email;";
            $data=DB->first($query, ["address" => $address,"city"=>$city,"state"=>$state,"pinCode"=>$pinCode,"mobileNumber"=>$mobileNumber,"email"=>$email]);

            if(!$data){
                response(["message"=>"updated success","validator"=>"true"],200);
            }
                response(["message"=>"updated failed","validator"=>"false"],400);


        }


        if($role=='admin') {
            if ($address == "") {
                response(["message" => "Address is Required"], 500);
            }
            if ($city == "") {
                response(["message" => "City is Required"], 500);
            }

            if ($state == "") {
                response(["message" => "State is Required"], 500);
            }

            if ($pinCode == "") {
                response(["message" => "Pin Code is Required"], 500);
            }

            if ($mobileNumber == "") {
                response(["message" => "Mobile Number is Required"], 500);
            }
            if($emailOfUser==""){
                response(["message" => "Email is Required"], 500);
            }

            $query="UPDATE contact_information
SET address = :address, city=:city,state=:state,pin_code=:pinCode,mobile_number=:mobileNumber
WHERE email = :email;";
            $data=DB->first($query, ["address" => $address,"city"=>$city,"state"=>$state,"pinCode"=>$pinCode,"mobileNumber"=>$mobileNumber,"email"=>$emailOfUser]);

            if(!$data){
                response(["message"=>"updated success","validator"=>"true"],200);
            }
            response(["message"=>"updated failed","validator"=>"false"],400);


        }


    }













}
