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
        Schema::create('subject_exams', function (Blueprint $table) {
            $table->id();
  $table->bigInteger('subjects_id');
$table->foreign('subjects_id')->references('id')->on('subjects');
 $table->string('exam_name');
  $table->integer('total_no_of_questions');
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
        Schema::dropIfExists('subject_exams');
    }
};
