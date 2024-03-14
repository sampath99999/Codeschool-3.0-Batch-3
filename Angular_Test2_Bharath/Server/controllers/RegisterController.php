<?php

namespace App\controllers;

use App\Services\RegisterService;

class RegisterController extends Controller
{
    public function register()
    {

            return RegisterService::register();

    }
}
