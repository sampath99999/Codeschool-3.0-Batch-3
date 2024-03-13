<?php

namespace App\controllers;

use App\services\UserDataService;

class UserDataController
{
    public function userData()
    {
        try {
            return UserDataService::userData();
        } catch (\Exception $e) {
            return response(["message" => $e->getMessage()], 500);
        }
    }
    public function postCount()
    {
        try {
            return UserDataService::postCount();
        } catch (\Exception $e) {
            return response(["message" => $e->getMessage()], 500);
        }
    }
}