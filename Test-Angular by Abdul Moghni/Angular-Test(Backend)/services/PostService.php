<?php

namespace App\Services;

class PostService
{
    public static function createPost()
    {
        self::handleFormData();
        $title = $_POST['title'];
        $content = $_POST['content'];
        $published_date = date('Y-m-d');
        $user_id = Auth->user()["user_id"];


        $query = "INSERT INTO post (user_id,title,content,published_date)
                VALUES (:user_id, :title,:content,:published_date)";

        $user = DB->insert($query, ["user_id" => $user_id, "title" => $title, "content" => $content, "published_date" => $published_date]);

        if ($user) {

            return response(["message" => "Post created successfully", "user_id" => Auth->user()["user_id"]], 201);
        }

        return response(["message" => "Something went wrong !!! "], 400);
    }


    public static function handleFormData()
    {
        if (!isset($_POST["title"]) || !isset($_POST["content"])) {
            return response(["message" => "Title and Content is required"], 400);
        }


    }


    public static function displayPost()
    {
        $query = "SELECT * FROM post";
        $postData = DB->displayall($query);
        if ($postData) {
            return response(["message" => "Wallah you are geting your data", "Posts" => $postData], 201);
        }
    }

}
