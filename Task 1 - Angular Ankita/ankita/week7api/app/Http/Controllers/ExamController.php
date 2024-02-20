<?php

namespace App\Http\Controllers;

use App\Models\Answer;
use App\Models\Question;
use App\Models\SubjectExam;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;

class ExamController extends Controller
{
    public function addTest(Request $request)
    {
        $subjectId = $request->id;
        $examName = $request->examName;
        $questionCount = $request->questionCount;
        $questions = $request->questions;



       
        try {
            DB::beginTransaction();
           


            $subjectExam = new SubjectExam();

            $subjectExam->subjects_id = $subjectId;
            $subjectExam->exam_name = $examName;
            $subjectExam->total_no_of_questions = $questionCount;

            $subjectExam->save();


            $answerData = [];
            foreach ($questions as $question) {
                $questionName = $question['questionName'];
                $questionId = Question::insertGetId(['subjects_exam_id' => $subjectExam->id, 'question_name' => $questionName]);
                $answers = $question['option'];
                foreach ($answers as $answer) {
                    $answerData = ['questions_id' => $questionId, 'option_name' => $answer['optionName'], 'is_answer' => $answer['is_Answer']];
                }
            }
            Answer::insert($answerData);
            DB::commit();
            return response()->json([
                'status' => true, 'message' => 'Test Added Sucessfully'
            ]);
        } catch (\Exception $e) {

            DB::rollBack();
            return response()->json([
                'status' => false, 'message' => 'Something Went Wrong', 'error' => $e->getMessage()
            ]);
        }
    }
    public function viewTest(Request $request)
    {
        $examId = $request->exam_id;
        try {
            $getQuestionDetails = SubjectExam::join('questions as q', 'subject_exams.id', '=', 'q.subjects_exam_id')
                ->join('answers as a', 'q.id', '=', 'a.question_id')
                ->select('q.id', 'question_name', 'option_name', 'is_answer', 'a.id as answer_id')->where('q.subjects_exam_id', $examId)->get()->toArray();
            if (count($getQuestionDetails) == 0) {
                return response()->json(["status" => false, "message" => "No Question  is added yet !"]);
            }
            $option = [];
            $result = [];
            foreach ($getQuestionDetails as $row) {
                $option = [
                    "option_name" => $row['option_name'],
                    "is_answer" => $row['is_answer'],
                    "option_id" => $row['answer_id']
                ];

                if (isset($result[$row['id']])) {
                    $result[$row['id']]['options'][] = $option;
                } else {
                    $result[$row['id']] = [
                        "question_name" => $row['question_name'],
                        "question_id" => $row['id'],
                        "options" => [$option]
                    ];
                }
            }

            $result = array_values($result);
            return response()->json([
                'status' => true, 'message' => 'Data Get Sucessfully', 'data' => $result
            ]);
        } catch (\Exception) {


            return response()->json([
                'status' => false, 'message' => 'Something Went Wrong'
            ]);
        }
    }
    public function ShowTest(Request $request)
    {
        $subjectId = $request->subject_id;
        try {
            $getExam = SubjectExam::Select('exam_name', 'id')->where('subjects_id', $subjectId)->get()->toArray();
            if (count($getExam) == 0) {
                return response()->json(["status" => false, "message" => "No Exam  is added yet !"]);
            }
            return response()->json([
                'status' => true, 'message' => 'Data Get Sucessfully', 'data' => $getExam
            ]);
        } catch (\Exception) {


            return response()->json([
                'status' => false, 'message' => 'Something Went Wrong'
            ]);
        }
    }
}
