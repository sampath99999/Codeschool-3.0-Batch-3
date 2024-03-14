<?php

namespace App\Services;

class AdminServices
{
    public static function getAllUsers()
    {
        $token = $_POST['token'];
        $query = "Select id,username from users where user_type='User'";
        $user = DB->getAll($query);
        if (!$user) {
            return response(["status"=>false,"message" => "Something went wrong!"], 400);
        }
        return response(["status"=>true,"message" => "Success", "users"=> $user], 200);
    }

    public static function createTask()
    {

        $title = $_POST['Title'];
        $description = $_POST['description'];
        $deadline= $_POST['deadline'];
        $User_Assign=$_POST['User_Assign'];
        $query = "INSERT INTO tasks(title,description,deadline,assigned_to) VALUES (:title,:description,:deadline,:assigned_to)";
        $user = DB->insert($query, ["title" => $title,"description"=>$description, "deadline" => $deadline,"assigned_to"=>$User_Assign]);
        if (!$user) {
            return response(["status"=>false,"message" => "Task creation failed"], 400);
        }

        return response(["status"=>true,"message" => "Task created successful"], 200);
    }
    public static function getAllTasks()
    {
        $query = "Select * from tasks";
        $user = DB->getAll($query);
        if (!$user) {
            return response(["status"=>false,"message" => "Something went wrong!"], 400);
        }
        return response(["status"=>true,"message" => "Success", "tasks"=> $user], 200);
    }



    public static function countOfTasks()
    {
        $all_query = "Select count(task_id) from tasks";
        $all_tasks = DB->getAll($all_query);
        $new_query = "Select count(task_id) from tasks where status='New'";
        $new_tasks = DB->getAll($new_query);
        $ready_query = "Select count(task_id) from tasks where status='Ready'";
        $ready_tasks = DB->getAll($ready_query);
        $development_query = "Select count(task_id) from tasks where status='Development'";
        $development_tasks = DB->getAll($development_query);
        $completed_query = "Select count(task_id) from tasks where status='Completed'";
        $completed_tasks = DB->getAll($completed_query);
        if (!$all_tasks || !$new_tasks || !$ready_tasks || !$development_tasks ||!$completed_tasks) {
            return response(["status"=>false,"message" => "Something went wrong!"], 400);
        }
        return response(["status"=>true,"message" => "Success","data"=>[ "allTasks"=> $all_tasks,'newTasks'=>$new_tasks,'readyTasks'=>$ready_tasks,'developmentTasks'=>$development_tasks,'completedTasks'=>$completed_tasks]], 200);
    }
}