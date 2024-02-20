<?php

use App\Http\Controllers\CategoryController;
use App\Http\Controllers\PriorityController;
use App\Http\Controllers\StatusController;
use App\Http\Controllers\TaskController;
use App\Http\Controllers\UserController;
use App\Models\Task;
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

Route::post('/register', [UserController::class, 'register']);
Route::post('/login', [UserController::class, 'login']);

Route::middleware(['auth:sanctum'])->group(function () {

    Route::get('/user-info', [UserController::class, 'getuserInfo']);

    Route::get('/priority-list', [PriorityController::class, 'getPriority']);
    Route::post('/add-new-priority', [PriorityController::class, 'addNewPriority']);
    Route::post('/update-priority', [PriorityController::class, 'updatePriority']);
    Route::post('/delete-priority', [PriorityController::class, 'deletePriority']);


    Route::get('/category-list', [CategoryController::class, 'getCategories']);
    Route::post('/add-new-category', [CategoryController::class, 'addNewCategory']);
    Route::post('/update-category', [CategoryController::class, 'updateCategory']);
    Route::post('/delete-category', [CategoryController::class, 'deleteCategory']);


    Route::get('/status-list', [StatusController::class, 'getStatus']);
    Route::post('/add-new-status', [StatusController::class, 'addNewStatus']);
    Route::post('/update-status', [StatusController::class, 'updateStatus']);
    Route::post('/delete-status', [StatusController::class, 'deleteStatus']);

    Route::get('/get-masterdata', [TaskController::class, 'getMasterData']);
    Route::get('/get-task-list', [TaskController::class, 'getTaskList']);
    Route::post('/add-new-task', [TaskController::class, 'addNewTask']);
});

// Route::middleware('auth:sanctum')->get('/user', function (Request $request) {
//     return $request->user();
// });
