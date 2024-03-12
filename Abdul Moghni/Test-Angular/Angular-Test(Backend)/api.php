<?php

use App\Controllers\PostController;
use App\Controllers\UserController;
use App\Controllers\CommentController;

use App\Providers\Router;

Router::post('/login', [UserController::class, 'login']);

Router::post('/register', [UserController::class, 'register'],true);
Router::post('/createPost', [PostController::class, 'create'], true);
Router::post('/deleteUser', [UserController::class, 'deleteUsers'], true);
Router::post('/createComment', [CommentController::class, 'create'], true);
Router::post('/displayPost', [PostController::class, 'display']);
Router::post('/logout', [UserController::class, 'logout'], true);
Router::post('/getUser', [UserController::class, 'getUser'], true);