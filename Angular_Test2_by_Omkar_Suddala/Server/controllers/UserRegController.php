<?php

namespace App\controllers;

use App\services\RegisterService;


class UserRegController extends Controller
{
    public function register()
    {

            return RegisterService::register();

    }
    public function userExist()
    {
            return RegisterService::userExist();

    }
    public function userName()
    {

            return RegisterService::userName();
    }
}


