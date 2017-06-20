<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class CreateLinesTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('lines', function (Blueprint $table) {
            $table->integer('id')->unsigned();
            $table->integer('driver_id')->unsigned();
            $table->boolean('is_cancelled')->default(false);
            $table->string('cancel_reason', 255)->nullable();
            $table->timestamp('cancelled_at')->nullable();
            $table->boolean('is_completed')->default(false);
            $table->timestamp('completed_at')->nullable();
            $table->boolean('has_left')->default(false);
            $table->timestamp('left_at')->nullable();
            $table->integer('max_passengers')->unsigned();
            $table->integer('from_terminal')->unsigned();
            $table->integer('to_terminal')->unsigned();
            $table->datetime('date_leaving');
            $table->datetime('date_arriving');
            $table->boolean('is_closed')->default(false);
            $table->string('close_reason', 255)->nullable();
            $table->timestamps();

            $table->primary('id');
            $table->foreign('driver_id')->references('id')->on('drivers');
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('lines');
    }
}
