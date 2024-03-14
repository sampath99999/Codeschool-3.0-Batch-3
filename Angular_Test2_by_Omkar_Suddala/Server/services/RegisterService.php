<?php

namespace App\services;
class RegisterService
{
    public static function register()
    {

        self::validateFormData();
        self::userExist();
        $Username = $_POST['username'];
        $email = $_POST['email'];
        $password = md5($_POST['password']);
//        $UserType=$_POST['UserType'];
        $query = "INSERT INTO users(Username,password,email) VALUES (:fullName,:password,:email)";
        $user = DB->insert($query, ["fullName" => $Username,"email"=>$email, "password" => $password]);
        if (!$user) {
            return response(["status"=>false,"message" => "Registration failed"], 400);
        }

        return response(["status"=>true,"message" => "Register Success"], 200);
    }
    public static function  userExist()
    {
        $email = $_POST['email'];
        $query = "SELECT * FROM users WHERE  email=:email";
        $user = DB->first($query, ["email" => $email]);
        if ($user) {
            return response(['status'=>"message", "message" => "Email is already exits"], 200);
        }
    }

    public static function validateFormData()
    {
        if(empty($_POST['email']) && empty($_POST['password']) && empty($_POST['full_name'])){
            response(["message" => "Full name,Email and Password is required"], 400);
        }
        if(empty($_POST['email']) ){
            response(["message" => "Email is required"], 400);

        }
        if(empty($_POST['password'])) {
            response(["message" => "Password is required"], 400);
        }
    }
}