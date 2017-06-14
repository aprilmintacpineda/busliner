<?php

use Illuminate\Database\Seeder;

class DatabaseSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        $this->call(AdminsTableSeeder::class);
        $this->call(DriversTableSeeder::class);
        $this->call(LinesTableSeeder::class);
        $this->call(PhotosTableSeeder::class);
    }
}
