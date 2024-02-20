<?php

namespace App\Http\Controllers;

use App\Http\Requests\PriorityRequest;
use App\Http\Requests\UpdatePriorityRequest;
use App\Models\Priority;
use Exception;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class PriorityController extends Controller
{
    protected $user;

    // public function __construct()
    // {
    //     $this->user= Auth::user();
    // }

    public  function getPriority()
    {

        try {

            $this->user = Auth::user();
            $priority = $this->getPriorityList($this->user->id);

            return Response()->json(["status" => true, "message" => "Priority list retrieved successfully.", "data" => $priority]);
        } catch (Exception $e) {
            return Response()->json(["status" => false, "message" => $e->getMessage(), "data" => null]);
        }
    }

    public  static function getPriorityList($userId)
    {

        return Priority::select('id', 'description')
            ->where('status', true)
            ->where('created_by', $userId)
            ->get()
            ->toArray();
    }


    public function addNewPriority(PriorityRequest $request)
    {

        try {

            $this->user = Auth::user();
            $priorityDescription = $request->description;

            $priority = new Priority();

            $priority->description = $priorityDescription;
            $priority->created_by = $this->user->id;

            $priority->save();

            return Response()->json(["status" => true, "message" => "Priority added successfully", "data" => null]);
        } catch (Exception $e) {
            return Response()->json(["status" => false, "message" => $e->getMessage(), "data" => null]);
        }
    }


    public function updatePriority(UpdatePriorityRequest $request)
    {

        try {
            $this->user = Auth::user();
            $priorityId = $request->priority_id;
            $priorityDescription = $request->description;

            if (!$priorityDescription) {
                throw new Exception("Please enter the category to update!");
            }

            if (preg_match('/[^a-zA-Z0-9]/', $priorityDescription)) {
                throw new Exception("special character are not allowed description");
            }

            $category = Priority::where('id', $priorityId)->where('created_by', $this->user->id)->first();

            $category->description = $priorityDescription;

            $category->save();

            return Response()->json(["status" => true, "message" => "Category updated successfully", "data" => null]);
        } catch (Exception $e) {
            return Response()->json(["status" => false, "message" => $e->getMessage(), "data" => null]);
        }
    }

    public function deletePriority(UpdatePriorityRequest $request)
    {
        try {
            $this->user = Auth::user();
            $priorityId = $request->priority_id;

            $priority = Priority::where('id', $priorityId)->where('status', true)->where('created_by', $this->user->id)->first();

            if (!$priority) {
                throw new Exception("Invalid Category");
            }

            $priority->status = false;

            $priority->save();

            return Response()->json(["status" => true, "message" => "Category deleted successfully", "data" => null]);
        } catch (Exception $e) {
            return Response()->json(["status" => false, "message" => $e->getMessage(), "data" => null]);
        }
    }
}
