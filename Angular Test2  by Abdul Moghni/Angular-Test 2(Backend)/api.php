<?php


use App\Controllers\UserController;


use App\Providers\Router;

Router::post('/login', [UserController::class, 'login']);
Router::post('/register', [UserController::class, 'register']);

Router::post('/logout', [UserController::class, 'logout'], true);
Router::post('/getUser', [UserController::class, 'getUser'], true);
Router::post('/adminTableDetail', [UserController::class, 'adminTableDetail'], true);
Router::post('/deleteUser', [UserController::class, 'deleteUserThroughAdmin'], true);
Router::post('/selectedUserProfile', [UserController::class, 'displaySelectedUserProfile'], true);
Router::post('/userProfile', [UserController::class, 'displayUserProfile'], true);
Router::post('/updateUserProfile', [UserController::class, 'updateUserProfile'], true);