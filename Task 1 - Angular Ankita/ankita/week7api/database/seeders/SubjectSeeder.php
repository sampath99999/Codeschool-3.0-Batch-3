<?php

namespace Database\Seeders;

use App\Models\Subject;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class SubjectSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        $subject=[['name'=>'C','image'=>'../../assets/images/c.jpg'],['name'=>'Python','image'=>'../../assets/images/python.jpg'],['name'=>'DSA','image'=>'../../assets/images/dsa.jpg'],['name'=>'C++','image'=>'../../assets/images/c++.png'],['name'=>'MYSQL','image'=>'../../assets/images/mysql.png']];
Subject::insert($subject);
    }
}
