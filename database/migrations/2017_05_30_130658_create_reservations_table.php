<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class CreateReservationsTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('reservations', function (Blueprint $table) {
            $table->integer('id')->unsigned();
            $table->integer('line_id')->unsigned();
            $table->integer('user_id')->unsigned();
            $table->boolean('is_cancelled')->default(false);
            $table->string('cancel_reason', 255)->nullable();
            $table->timestamp('cancelled_at')->nullable();
            $table->timestamps();

            $table->primary('id');
            $table->foreign('line_id')->references('id')->on('lines');
            $table->foreign('user_id')->references('id')->on('users');
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('reservations');
    }
}
