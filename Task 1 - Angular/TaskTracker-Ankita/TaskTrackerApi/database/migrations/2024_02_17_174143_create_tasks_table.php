<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('tasks', function (Blueprint $table) {
            $table->id();
            $table->string('name');
            $table->bigInteger('task_category_id');
            $table->foreign('task_category_id')->references('id')->on('task_categories');
            $table->bigInteger('priority_id');
            $table->foreign('priority_id')->references('id')->on('priorities');
            $table->string('description');
            $table->date('deadline');
            $table->bigInteger('task_status_id');
            $table->foreign('task_status_id')->references('id')->on('task_statuses');
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('tasks');
    }
};
