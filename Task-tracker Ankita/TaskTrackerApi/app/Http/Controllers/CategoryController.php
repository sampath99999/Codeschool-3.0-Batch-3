<?php

namespace App\Http\Controllers;

use App\Http\Requests\CategoryRequest;
use App\Http\Requests\UpdateCategoryRequest;
use App\Models\TaskCategory;
use Exception;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class CategoryController extends Controller
{


    public $user;

    // public function __construct()
    // {
    //     $this->user = Auth::user();
    // }

    public  function getCategories()
    {

        try {
            $this->user = Auth::user();

            $category = $this->getCategoryList($this->user->id);

            return Response()->json(["status" => true, "message" => "Category list retrieved successfully.", "data" => $category]);
        } catch (Exception $e) {
            return Response()->json(["status" => false, "message" => $e->getMessage(), "data" => null]);
        }
    }

    public  static function getCategoryList($userId)
    {

        return TaskCategory::select('id', 'description')
            ->where('status', true)
            ->where('created_by', $userId)
            ->get()
            ->toArray();
    }


    public function addNewCategory(CategoryRequest $request)
    {

        try {
            $this->user = Auth::user();
            $categoryDescription = $request->description;

            $category = new TaskCategory();

            $category->description = $categoryDescription;
            $category->created_by = $this->user->id;

            $category->save();

            return Response()->json(["status" => true, "message" => "Category added successfully", "data" => null]);
        } catch (Exception $e) {
            return Response()->json(["status" => false, "message" => $e->getMessage(), "data" => null]);
        }
    }


    public function updateCategory(UpdateCategoryRequest $request)
    {

        try {
            $this->user = Auth::user();
            $categoryId = $request->category_id;
            $categoryDescription = $request->description;

            if (!$categoryDescription) {
                throw new Exception("Please enter the category to update!");
            }

            if (preg_match('/[^a-zA-Z0-9]/', $categoryDescription)) {
                throw new Exception("special character are not allowed description");
            }

            $category = TaskCategory::where('id', $categoryId)->where('created_by', $this->user->id)->first();

            $category->description = $categoryDescription;

            $category->save();

            return Response()->json(["status" => true, "message" => "Category updated successfully", "data" => null]);
        } catch (Exception $e) {
            return Response()->json(["status" => false, "message" => $e->getMessage(), "data" => null]);
        }
    }

    public function deleteCategory(UpdateCategoryRequest $request)
    {
        try {
            $categoryId = $request->category_id;
            $this->user = Auth::user();
            $category = TaskCategory::where('id', $categoryId)->where('status', true)->where('created_by', $this->user->id)->first();

            if (!$category) {
                throw new Exception("Invalid Category");
            }

            $category->status = false;

            $category->save();

            return Response()->json(["status" => true, "message" => "Category deleted successfully", "data" => null]);
        } catch (Exception $e) {
            return Response()->json(["status" => false, "message" => $e->getMessage(), "data" => null]);
        }
    }
}
