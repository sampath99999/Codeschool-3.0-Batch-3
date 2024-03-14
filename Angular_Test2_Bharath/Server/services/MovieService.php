<?php

namespace App\Services;


class MovieService
{
    public static function addMovie()
    {
        self::handleFormData();


        $title = $_POST['title'];
        $director = $_POST['director'];
        $rating = $_POST['rating'];
        $poster_url = $_POST['poster_url'];
//        $watched =$_POST['watched'];
        $category_id =$_POST['categories'];
        $query = "INSERT INTO movies (title, director, rating, poster_url,category_id)
          VALUES (:title, :director, :rating, :poster_url,:category_id)";

        $user = DB->insert($query, [

            "title" => $title,
            "director" => $director,
            "rating" => $rating,
            "poster_url" => $poster_url,

           "category_id"=>$category_id


        ]);

        if ($user) {
            return response(["message" => "Movie added successfully"], 201);
        } else {
            return response(["message" => "Something went wrong !!! "], 400);
        }
    }


    public static function handleFormData()
    {
        if (empty($_POST["title"]) || empty($_POST["director"]) || empty($_POST["rating"]) || empty($_POST["poster_url"])|| empty($_POST["categories"]) ) {
            return response(["message" => "Title, director, rating, poster_url, and watched are required"], 400);
        }
    }


    public static function showMovies()
    {
        $query = "SELECT * FROM movies ";
        $movieData = DB->select($query);
        if ($movieData) {
            return response(["status" => "true", "message" => "you are getting your data", "Movies" => $movieData], 201);
        }
    }

    public static function showCategories(){
        $query = "SELECT * FROM categories ";
        $categoryData = DB->select($query);
        if ($categoryData) {
            return response(["status" => "true", "message" => "you are getting your data", "Categories" => $categoryData], 201);
        }
    }




}








