<?php

use Illuminate\Database\Seeder;
use App\Helpers\Generator;
use App\Line;
use App\Driver;

class LinesTableSeeder extends Seeder
{
  /**
   * Run the database seeds.
   *
   * @return void
   */
  public function run()
  {
    Driver::all()->each(function($item) {
      $line = new Line;
      $line->id = Generator::id();
      $line->driver_id = $item->id;
      $line->max_passengers = 30;
      $line->destination = 'Batangas';
      $line->schedule = date('Y-m-d H:i:s', time() + (86400 * 3));
      $line->save();
    });
  }
}
