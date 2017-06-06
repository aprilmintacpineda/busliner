<?php

use Illuminate\Database\Seeder;
use App\Helpers\Generator;
use App\Driver;

class DriversTableSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        $driver = new Driver;
        $driver->id = Generator::id();
        $driver->first_name = 'Mang Jose';
        $driver->middle_name = 'Partida';
        $driver->surname = 'Naka-Pikit';
        $driver->save();
    }
}
