<?php

namespace App\Services;

class UserService
{
    public static function login()
    {
        self::validateFormData();
        $email = $_POST['email'];
//       $password = md5($_POST['password']);
        $password = $_POST['password'];

        $query = "SELECT id FROM admins WHERE email = :email AND password = :password";
        $user = DB->first($query, ["email" => $email, "password" => $password]);
        if (!$user) {
            return response(["status"=>false,"message" => "Email or Password incorrect"], 400);
        }
        $token = self::generateToken();
        $query = "UPDATE admins SET token = :token WHERE  id = :id";
        DB->update($query, ["token" => $token, "id" => $user["id"]]);
        return response(["status"=>true,"message" => "Login Success", "token" => $token], 200);
    }

    public static function generateToken()
    {
        $token = bin2hex(random_bytes(32));
        $query = "SELECT id FROM admins WHERE token = :token";
        $user = DB->first($query, ["token" => $token]);
        if ($user) {
            return self::generateToken();
        }
        return $token;
    }

    public static function validateToken()
    {
        if (!isset($_POST['token'])) {
            return response(["message" => "Token is missing"], 400);
        }
        $token = $_POST['token'];
        $query = "SELECT * FROM admins WHERE token = :token";
        $user = DB->first($query, ["token" => $token]);
        if (!$user) {
            return response(["message" => "Token is invalid"], 400);
        }
        Auth->setUser($user);
    }



    public static function validateFormData()
    {
        if(!isset($_POST['email']) && !isset($_POST['password'])){
//            echo 'hii';
            response(["message" => "Email and Password is required"], 400);
        }
        if(empty($_POST['email']) ){
            response(["message" => "Email is required"], 400);

        }
        if(empty($_POST['password'])) {
            response(["message" => "Password is required"], 400);
        }
    }

}



