<?php

namespace App\controllers;

use App\Services\UserService;

class UserController extends Controller
{
    public function login()
    {
        try {
            return UserService::login();
        } catch (\Exception $e) {
            return response(["message" => $e->getMessage()], 500);
        }
    }
}
