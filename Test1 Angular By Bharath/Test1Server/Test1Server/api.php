<?php

use App\Controllers\EmployeeController;
use App\Controllers\UserController;
use App\controllers\UserDataController;
use App\Providers\Router;



Router::post('/login', [UserController::class, 'login']);



Router::post('/userData', [UserDataController::class, 'userData']);

Router::post('/addEmployee', [EmployeeController::class, 'addEmployee']);


Router::post('/getEmployee', [EmployeeController::class, 'getEmployee'],true);






