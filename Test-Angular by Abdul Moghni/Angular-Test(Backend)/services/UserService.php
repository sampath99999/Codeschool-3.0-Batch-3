<?php

namespace App\Services;

class UserService
{
    public static function login()
    {
        self::validateFormData();
        $email = $_POST['email'];
        $password = md5($_POST['password']);

        $query = "SELECT userid,role FROM users WHERE ( email = :email) AND password = :password";
        $user = DB->first($query, ["email" => $email, "password" => $password]);
        if (!$user) {
            return response(["message" => "Username or Password incorrect"], 400);
        }
        $token = self::generateToken();
        $query = "UPDATE users SET token = :token WHERE userid = :id";
        DB->update($query, ["token" => $token, "id" => $user["userid"]]);
        return response(["message" => "Login Success", "token" => $token,"validator"=>"true","role"=>$user["role"]], 200);
    }

    public static function register()
    {
        self::validateRegisterFormData();

        $name = $_POST['name'];
        $email= $_POST['email'];
        $password = $_POST['password'];
        $role=$_POST['role'];
        $password = md5($_POST['password']);

        $query = "SELECT * FROM users WHERE  email = :email ";
        $user = DB->first($query, [ "email" => $email]);
        if ($user) {
            return response(["message" => "User already Existed"], 400);
        }
        $query = "INSERT INTO users (name,email,password,role)
VALUES (:name, :email,:password,:role)";
        $user = DB->insert($query, ["name" => $name, "password" => $password, "email" => $email, "role"=>$role]);
        return response(["message" => "Register Successful","validator"=>"true"], 200);


    }

    public static function logout()
    {
        $userid = Auth->user()["userid"];
        $query = "UPDATE users SET token ='' WHERE userid=:userid;";
        $update=DB->update($query,["userid" => $userid]);
        if($update){
             return response(["message"=>"User logout Successfully"],201);
        }
        return response(["message"=>"Un-intended thing happen"],400);
    }

    public static function getUser(){
        $username = Auth->user()["name"];
        $role= Auth->user()["role"];
        if($username){
            return response(["data"=>$username,"validator"=>"true","role"=>$role],201);
        }
        return response(["message"=>"Go Back home do not try to mischieve"],400);
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
        $query = "SELECT userid FROM users WHERE token = :token";
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
        $userRole=Auth->user()["role"];
            if($userRole!=1){
                response(["message" => "Access Denied"], 400);
            }
        if (!isset($_POST['name']) || !isset($_POST['email']) || !isset($_POST['password'])  ) {
            response(["message" => "Some thing in form not filled"], 400);
        }

        $password = $_POST['password'];

        $pattern = '/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{8,}$/';

        if(!isset($_POST['role'])){
            response(["message" => "Role is needed"], 400);
        }
        if (!preg_match($pattern, $password)) {
            response(["message" => "Please enter valid password"], 400);
        }

        $email = $_POST['email'];

        if (!filter_var($email, FILTER_VALIDATE_EMAIL)) {
            response(["message" => "Please enter valid email"], 400);
        }

    }




}
