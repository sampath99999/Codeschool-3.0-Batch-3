<?php

namespace App\services;

class UserDataService
{

    public static function userData()
    {
        $token = $_POST['token'];
        $query = "Select id,username,user_type from users where token=:token ";
        $user = DB->first($query, ["token" => $token]);
        if (!$user) {
            return response(["status"=>false,"message" => "Something went wrong!"], 400);
        }
        return response(["status"=>true,"message" => "Success", "data"=> $user], 200);
    }
    public static function getUserTask()
    {
        $query = "Select * from tasks where Assigned_To=:id ";
        $user = DB->select($query, ["id" => Auth->user()['id']]);
        if (!$user) {
            return response(["status"=>false,"message" => "Something went wrong!"], 400);
        }
        return response(["status"=>true,"message" => "Success", "tasks"=> $user], 200);
    }
    public static function taskStatusUpdate()
    {
        $taskId = $_POST['taskId'];
        $status=$_POST['status'];
        $query = "UPDATE tasks SET status = :status WHERE task_id = :taskId ";

        $user = DB->update($query, ["taskId" => $taskId,"status"=>$status]);
        if (!$user) {
            return response(["status"=>false,"message" => "Something went wrong!"], 400);
        }
        return response(["status"=>true,"message" => "Success", "tasks"=> $user], 200);
    }


}