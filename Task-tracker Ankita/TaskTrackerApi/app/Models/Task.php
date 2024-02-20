<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Task extends Model
{
    use HasFactory;

    public function status()
    {

        return $this->hasOne(TaskStatus::class, 'id', 'task_status_id');
    }

    public function category()
    {

        return $this->hasOne(TaskCategory::class, 'id', 'task_category_id');
    }


    public function priority()
    {

        return $this->hasOne(Priority::class, 'id', 'priority_id');
    }
}
