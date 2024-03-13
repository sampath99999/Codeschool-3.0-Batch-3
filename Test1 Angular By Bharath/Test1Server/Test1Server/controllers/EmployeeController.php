<?php

namespace App\Controllers;

use App\Services\EmployService;

class EmployeeController extends controller
{
    public function addEmployee()
    {
        return EmployService::addEmployee();

    }

    public function getEmployee()
    {
        return EmployService::getEmployee();

    }

}
