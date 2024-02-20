<?php

namespace App\Http\Controllers;

use App\Http\Requests\StatusRequest;
use App\Http\Requests\UpdateStatusRequest;
use App\Models\TaskStatus;
use Exception;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class StatusController extends Controller
{
    public $user;

    // public function __construct()
    // {
    //     $this->user = Auth::user();
    // }
    public  function getStatus()
    {

        try {
            $this->user = Auth::user();

            $status = $this->getStatusList($this->user->id);

            return Response()->json(["status" => true, "message" => "Priority list retrieved successfully.", "data" => $status]);
        } catch (Exception $e) {
            return Response()->json(["status" => false, "message" => $e->getMessage(), "data" => null]);
        }
    }

    public  static function getStatusList($userId)
    {

        return TaskStatus::select('id', 'description')
            ->where('status', true)
            ->where('created_by', $userId)
            ->get()
            ->toArray();
    }


    public function addNewStatus(StatusRequest $request)
    {

        try {
            $this->user = Auth::user();
            $statusDescription = $request->description;

            $status = new TaskStatus();

            $status->created_by = $this->user->id;
            $status->description = $statusDescription;

            $status->save();

            return Response()->json(["status" => true, "message" => "Priority added successfully", "data" => null]);
        } catch (Exception $e) {
            return Response()->json(["status" => false, "message" => $e->getMessage(), "data" => null]);
        }
    }


    public function updateStatus(UpdateStatusRequest $request)
    {

        try {
            $this->user = Auth::user();
            $statusId = $request->status_id;
            $statusDescription = $request->description;

            if (!$statusDescription) {
                throw new Exception("Please enter the category to update!");
            }

            if (preg_match('/[^a-zA-Z0-9]/', $statusDescription)) {
                throw new Exception("special character are not allowed description");
            }

            $status = TaskStatus::where('id', $statusId)->where('created_by', $this->user->id)->first();

            $status->description = $statusDescription;

            $status->save();

            return Response()->json(["status" => true, "message" => "Category updated successfully", "data" => null]);
        } catch (Exception $e) {
            return Response()->json(["status" => false, "message" => $e->getMessage(), "data" => null]);
        }
    }

    public function deleteStatus(UpdateStatusRequest $request)
    {
        try {
            $this->user = Auth::user();
            $statusId = $request->status_id;

            $status = TaskStatus::where('id', $statusId)->where('status', true)->where('created_by', $this->user->id)->first();

            if (!$status) {
                throw new Exception("Invalid Category");
            }

            $status->status = false;

            $status->save();

            return Response()->json(["status" => true, "message" => "Category deleted successfully", "data" => null]);
        } catch (Exception $e) {
            return Response()->json(["status" => false, "message" => $e->getMessage(), "data" => null]);
        }
    }
}
