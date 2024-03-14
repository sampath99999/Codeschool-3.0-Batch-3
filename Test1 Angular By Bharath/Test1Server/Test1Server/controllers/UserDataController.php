<?php

namespace App\controllers;

use App\Services\UserDataService;


class UserDataController extends Controller{
    public function userData(){
        try {
            return UserDataService::userData();
        } catch (\Exception $e) {
            return response(["message" => $e->getMessage()], 500);
        }
    }
}

