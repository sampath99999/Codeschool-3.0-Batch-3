<?php

namespace App\services;

class AdminService
{
    public static function adminData(){
$token = $_POST['token'];
$adminquery = "SELECT * FROM admins where token= :token ";
$admin = DB->first($adminquery, ["token" => $token]);
if($admin){
return response(["status"=>"true","message" => "Login Success", "data"=> $admin], 200);

}

return response(["status" => "false", "message" => "Something went wrong!"], 400);


}
    public static function getAllUsers(){
        $adminquery = "SELECT id,username,email, TO_CHAR(createdatregistration, 'DD-MM-YYYY HH:MM:SS') AS createdatregistration FROM users where  is_deleted = false";
        $admin = DB->getAllPost($adminquery);
        if($admin){
            return response(["status"=>"true","message" => "All users", "data"=> $admin], 200);
        } return response(["status" => "false", "message" => "Something went wrong!"], 400);
    }
    public static function countUserAndPosts(){
        $query = "Select Count(id)as uesrs from users where  is_deleted = false";
        $activatedUsers = DB->select($query);
        if($activatedUsers){
            $postCount="Select Count(postid)as posts from post where  is_post_deleted = false";
            $activePost= DB->select($postCount);
            if($activePost){
                $query = "Select Count(id)as uesrs from users where  is_deleted = true";
                $deactiveUsers = DB->select($query);
                if($deactiveUsers){
                    $postCount="Select Count(postid)as posts from post where  is_post_deleted = true";
                    $deactivePost= DB->select($postCount);
                    if($deactivePost){
                        return response(["status"=>"true","message" => "All users", "activatedUsers"=> $activatedUsers,"deactivatedUsers"=> $deactiveUsers,"activePost"=>$activePost,"deactivePost"=>$deactivePost], 200);
                    }
                }
            }
        }
        return response(["status" => "false", "message" => "Something went wrong!"], 400);
}
    public static function deleteUser(){
        $id=$_POST['userId'];
        $adminquery = "UPDATE users SET is_deleted = true WHERE id = :id";
        $admin = DB->update($adminquery,["id"=>$id]);
        if($admin){
            return response(["status"=>"true","message" => "User deleted success ", "data"=> $admin], 200);
        }
        return response(["status" => "false", "message" => "Something went wrong!"], 400);
    }
    public static function deletePost(){
        $postId=$_POST['postId'];
        $adminquery = "UPDATE post SET is_post_deleted = true WHERE  postid=:postId ";
        $admin = DB->update($adminquery,["postId"=>$postId]);
        if($admin){
            return response(["status"=>"true","message" => "User deleted success ", "data"=> $admin], 200);
        }
        return response(["status" => "false", "message" => "Something went wrong!"], 400);
    }
    public static function deleteComment(){
        $commentid=$_POST['commentId'];
        $adminquery = "UPDATE comments SET is_comment_deleted = true WHERE  commentid=:commentId ";
        $admin = DB->delete($adminquery,["commentId"=>$commentid]);
        if($admin){
            return response(["status"=>"true","message" => "Comment deleted success ", "data"=> $admin], 200);
        }
        return response(["status" => "false", "message" => "Something went wrong!"], 400);
    }
}