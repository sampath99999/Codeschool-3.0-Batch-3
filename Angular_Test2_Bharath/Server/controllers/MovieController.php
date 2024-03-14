<?php

namespace App\Controllers;

use App\Services\MovieService;

class MovieController
{
    public function addMovie()
    {
        return MovieService::addMovie();

    }
        public function showMovies()
    {
        return MovieService::showMovies();
    }


    public function showCategories()
    {
        return MovieService::showCategories();
    }


}
