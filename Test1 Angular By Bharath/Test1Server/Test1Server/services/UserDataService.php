<?php

namespace App\Services;

class UserDataService{
    public static function userData(){

        $token = $_POST['token'];
        $query = "SELECT * FROM admins WHERE token = :token";
        $user = DB->first($query, ["token" => $token]);
        if (!$user) {
            return response(["status"=>"false","message" => "Something went wrong!"], 400);
        }
        return response(["status"=>"true","message" => "Login Success", "data"=>["userdata" => $user]], 200);
    }





}


