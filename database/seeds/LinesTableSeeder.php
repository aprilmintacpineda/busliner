<?php

use Illuminate\Database\Seeder;
use App\Helpers\Generator;
use App\Line;
use App\Driver;
use App\Terminal;

class LinesTableSeeder extends Seeder
{
  /**
   * Run the database seeds.
   *
   * @return void
   */
  public function run()
  {
    $drivers = Driver::all();
    $terminals = Terminal::all();

    for($a = 0; $a < count($terminals); $a++) {
      $line = new Line;
      $line->id = Generator::id();
      $line->driver_id = $drivers[$a]->id;
      $line->max_passengers = 30;
      $line->from_terminal = $a == 0? $terminals[$a + 1]->id : $terminals[$a - 1]->id;
      $line->to_terminal = $terminals[$a]->id;
      $line->date_leaving = date('Y-m-d H:i:s', time() + (86400 * 3));
      $line->date_arriving = date('Y-m-d H:i:s', time() + ((86400 * 3) + (3600 * 15)));
      $line->save();
    }
  }
}
