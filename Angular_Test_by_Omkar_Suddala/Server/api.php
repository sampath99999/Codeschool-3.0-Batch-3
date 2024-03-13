<?php

use App\Controllers\PostController;
use App\Controllers\UserController;
use App\Controllers\UserRegController;
use App\Controllers\UserDataController;
use App\Controllers\AdminControl;

use App\Providers\Router;

Router::post('/login', [UserController::class, 'login']);

Router::post('/register', [UserRegController::class, 'register']);
Router::post('/userExist', [UserRegController::class, 'userExist']);
Router::post('/userName', [UserRegController::class, 'userName']);


Router::post('/userData', [UserDataController::class, 'userData'],true);
Router::post('/postCount', [UserDataController::class, 'postCount'],true);



Router::post('/createPost', [PostController::class, 'createPost'], true);
Router::post('/allPost', [PostController::class, 'allPost']);
Router::post('/postLikes', [PostController::class, 'postLikes'],true);
Router::post('/likes', [PostController::class, 'likes'],true);
Router::post('/viewPost', [PostController::class, 'viewPost']);


Router::post('/likeCount', [PostController::class, 'likeCount'],true);
Router::post('/unLikeCount', [PostController::class, 'unLikeCount'],true);
Router::post('/createComments', [PostController::class, 'createComments'],true);
Router::post('/allComments', [PostController::class, 'allComments']);
Router::post('/postComments', [PostController::class, 'postComments']);


Router::post('/adminData', [AdminControl::class, 'adminData']);
Router::post('/getAllUsers', [AdminControl::class, 'getAllUsers']);
Router::post('/deleteUser', [AdminControl::class, 'deleteUser']);
Router::post('/deleteComment', [AdminControl::class, 'deleteComment']);
Router::post('/deletePost', [AdminControl::class, 'deletePost']);

Router::post('/countUserAndPosts', [AdminControl::class, 'countUserAndPosts']);


