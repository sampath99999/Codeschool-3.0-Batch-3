<?php

use App\Controllers\MovieController;
use App\Controllers\UserController;
use App\Controllers\RegisterController;
use App\controllers\UserDataController;
use App\Providers\Router;

Router::post('/login', [UserController::class, 'login']);

Router::post('/register', [RegisterController::class, 'register']);

Router::post('/userData', [UserDataController::class, 'userData']);

Router::post('/addMovie', [MovieController::class, 'addMovie']);

Router::post('/showMovies', [MovieController::class, 'showMovies'],true);

Router::post('/showCategories', [MovieController::class, 'showCategories'],true);




