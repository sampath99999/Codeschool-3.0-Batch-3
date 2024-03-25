<?php

namespace App\services;

use App\Providers\Auth;

class CommentService
{
    public static function createComment()
    {
        self::handleFormData();
        $user_id = Auth->user()["user_id"];
        $post_id = $_POST['post_id'];
        $name = Auth->user()["first_name"];
        $email = Auth->user()["email"];
        $content = $_POST['content'];
        $date_of_creation = date('Y-m-d');


        $query = "INSERT INTO comment (post_id,user_id,name,email,content,date_of_creation)
                VALUES (:post_id, :user_id,:name,:email,:content,:date_of_creation)";

        $user = DB->insert($query, ["user_id" => $user_id, "post_id" => $post_id, "name" => $name, "email" => $email, "content" => $content, "date_of_creation" => $date_of_creation]);

        if ($user) {

            return response(["message" => "Comment created successfully", "user_id" => Auth->user()["user_id"]], 201);
        }

        return response(["message" => "Something went wrong !!! "], 400);
    }

    public static function handleFormData()
    {
        if (!isset($_POST["content"]) || $_POST["content"]=="") {
            return response(["message" => "Content is required"], 400);
        }


    }

}