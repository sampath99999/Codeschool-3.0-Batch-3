<?php

namespace App\Http\Controllers;

use App\Http\Requests\AddNewTaskRequest;
use App\Models\Task;
use Exception;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class TaskController extends Controller
{
    public $user;

    // public function __construct()
    // {
    //     $this->user = Auth::user();
    // }
    public function getMasterData()
    {


        try {
            $this->user = Auth::user();
            $masterData = [
                "status" => StatusController::getStatusList($this->user->id),
                "priority" => PriorityController::getPriorityList($this->user->id),
                "category" => CategoryController::getCategoryList($this->user->id)
            ];
            return Response()->json(["status" => true, "message" => "Master data retrieved successfully.", "data" => $masterData]);
        } catch (Exception $e) {
            return Response()->json(["status" => false, "message" => $e->getMessage(), "data" => null]);
        }
    }

    public function addNewTask(AddNewTaskRequest $request)
    {

        try {
            $this->user = Auth::user();

            $taskName = $request->name;
            $taskStatusId = $request->status_id;
            $taskPriorityId = $request->priority_id;
            $categoryId = $request->category_id;
            $taskDate = $request->date;
            $taskDescription = $request->description;

            $task = new Task();

            $task->name = $taskName;
            $task->task_category_id = $categoryId;
            $task->priority_id = $taskPriorityId;
            $task->task_status_id = $taskStatusId;
            $task->deadline = $taskDate;
            $task->description = $taskDescription;
            $task->created_by = $this->user->id;

            $task->save();

            return Response()->json(["status" => true, "message" => "Task added successfully.", "data" => null]);
        } catch (Exception $e) {
            return Response()->json(["status" => false, "message" => $e->getMessage(), "data" => null]);
        }
    }

    public function getTaskList()
    {

        try {
            $this->user = Auth::user();

            $task = Task::select('id', 'name', 'task_category_id', 'priority_id', 'task_status_id', 'description', 'deadline')
                ->where('created_by', $this->user->id)
                ->with('status')
                ->with('category')
                ->with('priority')
                ->orderByDesc('created_at')
                ->get()
                ->toArray();

            return Response()->json(["status" => true, "message" => "Task list retrieved successsfully", "data" => $task]);
        } catch (Exception $e) {
            return Response()->json(["status" => false, "message" => $e->getMessage(), "data" => null]);
        }
    }

}
