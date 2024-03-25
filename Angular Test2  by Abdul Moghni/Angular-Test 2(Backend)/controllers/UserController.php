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
    public function register()
    {
        try {
            return UserService::register();
        } catch (\Exception $e) {
            return response(["message" => $e->getMessage()], 500);
        }
    }


    public function adminTableDetail(){
        try {
            return UserService::adminTableDetail();
        } catch (\Exception $e) {
            return response(["message" => $e->getMessage()], 500);
        }
    }


    public function deleteUserThroughAdmin(){
        try {
            return UserService::deleteUserThroughAdmin();
        } catch (\Exception $e) {
            return response(["message" => $e->getMessage()], 500);
        }
    }

    public function displaySelectedUserProfile(){
        try {
            return UserService::displaySelectedUserProfile();
        } catch (\Exception $e) {
            return response(["message" => $e->getMessage()], 500);
        }
    }



    public function logout()
    {
        try {
            return UserService::logout();
        } catch (\Exception $e) {
            return response(["message" => $e->getMessage()], 500);
        }
    }

    public function getUser()
    {
        try {
            return UserService::getUser();
        } catch (\Exception $e) {
            return response(["message" => $e->getMessage()], 500);
        }
    }
    public function deleteUsers()
    {
        try {
            return UserService::deleteUser();
        } catch (\Exception $e) {
            return response(["message" => $e->getMessage()], 500);
        }
    }




    public function displayUserProfile(){
        try {
            return UserService::displayUserProfile();
        } catch (\Exception $e) {
            return response(["message" => $e->getMessage()], 500);
        }
    }


    public function updateUserProfile(){
        try {
            return UserService::updateUserProfile();
        } catch (\Exception $e) {
            return response(["message" => $e->getMessage()], 500);
        }
    }



}
