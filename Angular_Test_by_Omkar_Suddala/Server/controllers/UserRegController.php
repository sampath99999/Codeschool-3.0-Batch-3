<?php

namespace App\controllers;

use App\services\RegisterService;

//use App\Services\UserService;

class UserRegController extends Controller
{
    public function register()
    {
        try {
            return RegisterService::register();
        } catch (\Exception $e) {
            return response(["message" => $e->getMessage()], 500);
        }
    }
    public function userExist()
    {
        try {
            return RegisterService::userExist();
        } catch (\Exception $e) {
            return response(["message" => $e->getMessage()], 500);
        }
    }
    public function userName()
    {
        try {
            return RegisterService::userName();
        } catch (\Exception $e) {
            return response(["message" => $e->getMessage()], 500);
        }
    }
}


