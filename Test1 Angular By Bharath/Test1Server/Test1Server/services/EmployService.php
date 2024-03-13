<?php

namespace App\Services;


use App\Providers\Auth;

class EmployService
{
    public static function addEmployee()
    {
        self::handleEmployeeData();


        $full_name = $_POST['full_name'];
        $gender = $_POST['gender'];
        $phone = $_POST['phone'];


        $query = "INSERT INTO employee (full_name, gender, phone)
          VALUES (:full_name, :gender, :phone)";

        $user = DB->insert($query, [

            "full_name" => $full_name,
            "gender" => $gender,
            "phone" => $phone,

        ]);

        if ($user) {
            $employeeId =$user;

            $designation = $_POST['designation'];
            $doj = $_POST['doj'];
            $location = $_POST['location'];



            $query2 = "INSERT INTO designation (employee_id, designation, doj, location)
                   VALUES (:employee_id, :designation, :doj, :location)";

            $designation= DB->insert($query2, [
                 "employee_id"=>$employeeId,
                "designation" => $designation,
                "doj" => $doj,
                "location" => $location
            ]);
            if ($designation) {
                $employeeId =$user;
                $basic_pay = $_POST['basic_pay'];
                $hra = $_POST['hra'];
                $incentives = $_POST['incentives'];
                $pf = $_POST['pf'];
                $income_tax = $_POST['income_tax'];




                $query3 = "INSERT INTO PayDetails (employee_id, basic_pay, hra, incentives, pf, income_tax)
                       VALUES (:employee_id, :basic_pay, :hra, :incentives, :pf, :income_tax)";

                $PayDetails = DB->insert($query3, [
                    "employee_id"=>$employeeId,
                    "basic_pay" => $basic_pay,
                    "hra" => $hra,
                    "incentives" => $incentives,
                    "pf" => $pf,
                    "income_tax" => $income_tax
                ]);

                if ($PayDetails) {
                    return response(["message" => "Employee added successfully"], 201);
                } else {
                    return response(["message" => "Something went wrong !!! "], 400);
                }
            }

        }
    }


    public static function handleEmployeeData()
    {
        if (empty($_POST["full_name"]) || empty($_POST["gender"]) || empty($_POST["phone"])) {
            return response(["message" => "FullName, Gender, and phone are required"], 400);
        }
    }


    public static function getEmployee()
    {
     $query = "SELECT 
    e.employee_id,
    e.full_name,
    d.designation,
    e.phone,
    d.doj,
    d.location,
    p.basic_pay,
    p.hra,
    p.incentives,
    p.pf,
    p.income_tax
FROM 
    employee e
JOIN 
    designation d ON e.employee_id = d.employee_id
JOIN 
    paydetails p ON e.employee_id = p.employee_id"
;

        $employeeData = DB->select($query);
        if($employeeData){
            return response(["status" => "true", "message" => "you are getting employee data", "Employee" => $employeeData], 201);
        }
          }



}







