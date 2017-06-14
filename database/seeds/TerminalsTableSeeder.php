<?php

use Illuminate\Database\Seeder;

use App\Helpers\Generator;
use App\Terminal;

class TerminalsTableSeeder extends Seeder
{
  /**
   * Run the database seeds.
   *
   * @return void
   */
  public function run()
  {
    $terminal = new Terminal;
    $terminal->id = Generator::id();
    $terminal->cover_image = 'terminal.jpg';
    $terminal->full_address = '6153 South Super Highway Makati, Philippines';
    $terminal->terminal_name = 'Makati Terminal';
    $terminal->save();

    $terminal = new Terminal;
    $terminal->id = Generator::id();
    $terminal->cover_image = 'terminal.jpg';
    $terminal->full_address = '6153 South Super Highway Makati, Philippines';
    $terminal->terminal_name = 'Tarlac Terminal';
    $terminal->save();

    $terminal = new Terminal;
    $terminal->id = Generator::id();
    $terminal->cover_image = 'terminal.jpg';
    $terminal->full_address = '6153 South Super Highway Makati, Philippines';
    $terminal->terminal_name = 'Bulacan Terminal';
    $terminal->save();

    $terminal = new Terminal;
    $terminal->id = Generator::id();
    $terminal->cover_image = 'terminal.jpg';
    $terminal->full_address = '6153 South Super Highway Makati, Philippines';
    $terminal->terminal_name = 'Cotabato Terminal';
    $terminal->save();

    $terminal = new Terminal;
    $terminal->id = Generator::id();
    $terminal->cover_image = 'terminal.jpg';
    $terminal->full_address = '6153 South Super Highway Makati, Philippines';
    $terminal->terminal_name = 'Nueva Ecija Terminal';
    $terminal->save();
  }
}
