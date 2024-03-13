<?php

namespace App\Services;

class UserService
{


    public static function login()
    {
        self::validateFormData();
        $email = $_POST['email'];
        $password = md5($_POST['password']);
//        $password=$_POST['password'];
        $query = "SELECT id FROM users WHERE email = :email  AND password = :password AND is_deleted=false";
        $user = DB->first($query, ["email" => $email,  "password" => $password]);
        if (!$user) {
            $adminquery = "SELECT id FROM admins WHERE email = :email  AND password = :password";
            $admin = DB->first($adminquery, ["email" => $email,  "password" => $password]);
           if(!$admin){
               return response(["message" => "Username or Password incorrect"], 400);

           }
            $token = self::generateAdminToken();
            $adminquery= "UPDATE admins SET token = :token WHERE id = :id ";
            DB->update($adminquery, ["token" => $token, "id" => $admin["id"]]);
            return response(["status"=>"admin", "message" => "Login Success", ["token" => $token]], 200);
        }
        $token = self::generateToken();
        $query = "UPDATE users SET token = :token WHERE id = :id AND is_deleted=false";
        DB->update($query, ["token" => $token, "id" => $user["id"]]);
        return response(["status"=>"user", "message" => "Login Success", ["token" => $token]], 200);
    }

    public static function generateToken()
    {
        $token = bin2hex(random_bytes(32));
        $query = "SELECT id FROM users WHERE token = :token AND is_deleted=false";
        $user = DB->first($query, ["token" => $token]);
        if ($user) {
            return self::generateToken();
        }
        return $token;
    }
    public static function generateAdminToken()
    {
        $token = bin2hex(random_bytes(32));
        $query = "SELECT id FROM admins WHERE token = :token";
        $admin = DB->first($query, ["token" => $token]);
        if ($admin) {
            return self::generateAdminToken();
        }
        return $token;
    }

    public static function validateToken()
    {
        $token = $_POST['token'];
        $query = "SELECT * FROM users WHERE token = :token AND is_deleted=false";
        $user = DB->first($query, ["token" => $token]);
        if (!$user) {
            return response(["message" => "Token is invalid"], 400);

        }
            Auth->setUser($user);



    }

    public static function validateFormData()
    {
        if(empty($_POST['email']) && empty($_POST['password'])){
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
