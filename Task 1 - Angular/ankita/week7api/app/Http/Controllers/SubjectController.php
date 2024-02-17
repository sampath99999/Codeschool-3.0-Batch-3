<?php

namespace App\Http\Controllers;

use App\Models\Subject;
use App\Models\SubjectExam;
use Illuminate\Http\Request;

class SubjectController extends Controller
{
    public function getSubject(Request $request)
    {
       try {
    $getSubject = Subject::select('id', 'name', 'image')->get()->toArray();

    // if (count($getSubject) == 0) {
    //     return response()->json(["status" => false, "message" => "No Subject Found !"]);
    // }

    return response()->json([
        'status' => true, 'message' => 'Data Get Successfully', 'data' => $getSubject
    ]);

} catch (\Exception $e) {
    return response()->json([
        'status' => false, 'message' => 'Something Went Wrong', 'error' => $e->getMessage()
    ]);
}
    }
    public function getSubjectExam(Request $request)
    {
        $subjectId = $request->subject_id;
        try {
            $getSubjectExam = SubjectExam::Join('subjects as s', 'subject_exams.subjects_id', '=', 's.id')->select('*')->where('subjects_id', $subjectId)->get()->toArray();
            if (count($getSubjectExam) == 0) {
                return response()->json(["status" => false, "message" => "No Subjects Exam Details  Found !"]);
            }
            return response()->json([
                'status' => true, 'message' => 'Data Get Sucessfully', 'data' => $getSubjectExam
            ]);
        } catch (\Exception) {


            return response()->json([
                'status' => false, 'message' => 'Something Went Wrong'
            ]);
        }
    }
}
