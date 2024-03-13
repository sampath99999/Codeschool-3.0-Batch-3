<?php

namespace App\services;
class RegisterService
{
    public static function register()
    {

        self::validateFormData();
        $username = $_POST['username'];
        $email = $_POST['email'];

        $password = md5($_POST['password']);
        $query = "INSERT INTO users(username,email,password) VALUES (:username,:email,:password)";
        $user = DB->insert($query, ["username" => $username,"email"=>$email, "password" => $password]);
        if (!$user) {
            return response(["status"=>false,"message" => "Registration failed"], 400);
        }

        return response(["status"=>true,"message" => "Register Success"], 200);
    }
    public static function userExist()
    {

        $email = $_POST['email'];
//        $password = md5($_POST['password']);
        $query = "SELECT * FROM users WHERE  email=:email ";
        $user = DB->first($query, ["email" => $email]);
        if ($user) {
            return response([ "message" => "Email is already exits"], 200);
        } else {
            return response([ "message" => ""], 200);

        }
    }
//    public static function userName()
//    {
//        $username = $_POST['username'];
//        $query = "SELECT * FROM users WHERE   username=:username ";
//        $user = DB->first($query, ["username" => $username]);
//        if ($user) {
//            return response(["message" => "Username is already exits"], 200);
//        }
//        else{
//            return response(["message" => "Username is available"], 200);
//
//        }
//    }
    public static function validateFormData()
    {
        if(empty($_POST['email']) && empty($_POST['password']) && empty($_POST['username'])){
            response(["message" => "Username,Email and Password is required"], 400);
        }
        if(empty($_POST['email']) ){
            response(["message" => "Email is required"], 400);

        }
        if(empty($_POST['password'])) {
            response(["message" => "Password is required"], 400);
        }
    }
}