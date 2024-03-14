<?php

namespace App\Services;

class RegisterService
{
    public static function register()
    {
        self::validateFormData();
        $username = $_POST['username'];
//        $password = md5($_POST['password']);
        $email = $_POST['email'];
        $password = $_POST['password'];
        $query = "INSERT INTO users (username, email, password) VALUES (:username, :email, :password)";

        $user = DB->insert($query, ["username" => $username, "email" => $email , "password" => $password]);
        if (!$user) {
            return response([ "status"=>false,"message" => "Register Failed"], 400);
        }else{
            return response(["status"=>true,"message" =>"Register Successful"], 200);
        }
    }
        public static function validateFormData()
        {
            if (empty($_POST['username']) || empty($_POST['email']) || empty($_POST['password'])) {
                response(["message" => "All fields are required"], 400);
            }
        }
    }





