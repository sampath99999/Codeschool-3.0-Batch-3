<?php

namespace App\controllers;



use App\Services\AdminServices;

class AdminController
{
    public function getAllUsers()
    {
            return AdminServices::getAllUsers();
    }
    public function createTask()
    {
        return AdminServices::createTask();
    }
    public function getAllTasks()
    {
        return AdminServices::getAllTasks();

    }
    public function countOfTasks()
    {
        return AdminServices::countOfTasks();

    }
}