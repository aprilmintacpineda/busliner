<?php

use Illuminate\Database\Seeder;
use App\Helpers\Generator;
use App\Line;

class LinesTableSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        $line = new Line;
        $line->id = Generator::id();
        $line->driver_id = 1;
        $line->max_passengers = 30;
        $line->destination = 'Batangas';
        $line->schedule = Generator::current_timestamp();
        $line->save();
    }
}
