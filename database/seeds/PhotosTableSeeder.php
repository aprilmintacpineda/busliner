<?php

use Illuminate\Database\Seeder;

use App\Helpers\Generator;
use App\Line;
use App\Photo;

class PhotosTableSeeder extends Seeder
{
  /**
   * Run the database seeds.
   *
   * @return void
   */
  public function run()
  {
    Line::all()->each(function($line) {
      $photo = new Photo;
      $photo->id = Generator::id();
      $photo->line_id = $line->id;
      $photo->file_name = 'daewoo-bus-bs106-4.jpg';
      $photo->save();

      $photo = new Photo;
      $photo->id = Generator::id();
      $photo->line_id = $line->id;
      $photo->file_name = 'greyhound-bus-2.jpg';
      $photo->save();

      $photo = new Photo;
      $photo->id = Generator::id();
      $photo->line_id = $line->id;
      $photo->file_name = 'hqdefault.jpg';
      $photo->save();

      $photo = new Photo;
      $photo->id = Generator::id();
      $photo->line_id = $line->id;
      $photo->file_name = 'Victory_Liner_at_Mabalacat_Bus_Terminal.jpg';
      $photo->save();

      $photo = new Photo;
      $photo->id = Generator::id();
      $photo->line_id = $line->id;
      $photo->file_name = 'violet_bus.jpg';
      $photo->save();
    });
  }
}
