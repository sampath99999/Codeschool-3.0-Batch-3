<?php

namespace App\services;

class UserDataService
{
    public static function postCount()
    {

        $token = $_POST['token'];
        $query = "SELECT u.id,u.username,p.blogimage,p.postid,p.postcontent,p.title FROM users u join post p on u.id=p.userid  WHERE u.token= :token  ";
        $user = DB->getAll($query, ["token" => $token]);
        if (!$user) {
            return response(["status"=>"false","message" => "Something went wrong!"], 400);

        }
        return response(["status"=>"true","message" => "Login Success", "data"=>["postCount" => $user]], 200);
    }
    public static function userData()
    {

        $token = $_POST['token'];
        $query = "Select id,username from users where token=:token ";
        $user = DB->first($query, ["token" => $token]);
        if (!$user) {

            return response(["status"=>"false","message" => "Something went wrong!"], 400);

        }
        $token = $_POST['token'];
        $query = "SELECT u.id,u.username,u.token,COUNT(p.userid) as postcount FROM users u join post p on u.id=p.userid  WHERE u.token=:token GROUP BY u.id ";
        $userdata = DB->first($query, ["token" => $token]);
        return response(["status"=>"true","message" => "Success", "data"=>["userdata" => $user,"profiledata"=>$userdata]], 200);
    }
    public static function profileData()
    {

        $token = $_POST['token'];
        $query = "SELECT u.id,u.username,u.token,COUNT(p.userid) as postcount FROM users u join post p on u.id=p.userid  WHERE u.token=:token GROUP BY u.id ";
        $user = DB->first($query, ["token" => $token]);
        if (!$user) {
            return response(["status"=>"false","message" => "Something went wrong!"], 400);
        }
        return response(["status"=>"true","message" => "Success", "data"=>["userdata" => $user]], 200);
    }

}