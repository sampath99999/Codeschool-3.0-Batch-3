<?php

use App\Controllers\PostController;
use App\Controllers\UserController;
use App\Controllers\UserRegController;
use App\Controllers\UserDataController;
use App\Controllers\AdminController;

use App\Providers\Router;

Router::post('/login', [UserController::class, 'login']);

Router::post('/register', [UserRegController::class, 'register']);



Router::post('/userData', [UserDataController::class, 'userData'],true);
Router::post('/getUserTask', [UserDataController::class, 'getUserTask'],true);
Router::post('/taskStatusUpdate', [UserDataController::class, 'taskStatusUpdate'],true);

Router::post('/getAllUsers', [AdminController::class, 'getAllUsers'],true);
Router::post('/getAllTasks', [AdminController::class, 'getAllTasks']);
Router::post('/countOfTasks', [AdminController::class, 'countOfTasks']);


Router::post('/createTask', [AdminController::class, 'createTask']);



