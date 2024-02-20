<?php

use App\Http\Controllers\ExamController;
use App\Http\Controllers\SubjectController;
use App\Http\Controllers\UserController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| is assigned the "api" middleware group. Enjoy building your API!
|
*/

Route::middleware('auth:sanctum')->get('/user', function (Request $request) {
    return $request->user();
});

Route::post('/addTest',[ExamController::class,'addTest']);
Route::post('/viewTest',[ExamController::class,'viewTest']);
Route::post('/showTest',[ExamController::class,'ShowTest']);
Route::get('/getSubject',[SubjectController::class,'getSubject']);
Route::post('/getSubjectExam',[SubjectController::class,'getSubjectExam']);
Route::post('/user',[UserController::class,'validateUser']);
Route::post('/session',[UserController::class,'validateSession']);
Route::post('/admin',[UserController::class,'validateAdmin']);
Route::post('/logIn',[UserController::class,'logIn']);