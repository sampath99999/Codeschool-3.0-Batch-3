<?php

namespace Database\Seeders;

use App\Models\SubjectExam;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class SubjectExamSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        $subjectExamDetails=[['subjects_id'=>1,'exam_name'=>'test1','total_no_of_questions'=>3],
['subjects_id'=>4,'exam_name'=>'test1','total_no_of_questions'=>4],
['subjects_id'=> 3,'exam_name'=>'test1','total_no_of_questions'=>6]];
SubjectExam::insert($subjectExamDetails);
    }
}
