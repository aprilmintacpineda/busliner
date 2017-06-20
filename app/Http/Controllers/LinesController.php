<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Database\Eloquent\ModelNotFoundException;

use App\Line;

class LinesController extends Controller
{
  public function get($page) {
    $limit = 10;
    $offset = ($page * $limit) - $limit;
    $lines = Line::where([
        ['is_cancelled', false],
        ['is_completed', false],
        ['has_left', false]
      ])->offset($offset)
      ->limit($limit)
      ->orderBy('date_leaving', 'desc')
      ->get();

    foreach($lines as $line) {
      $line->from_terminal = $line->from_terminal()->first();
      $line->to_terminal = $line->to_terminal()->first();
      $line->reservations;
      $line->reserved = $line->reserved();
    }

    return $lines;
  }

  public function show($id) {
    try {
      $line = Line::findOrFail($id);
      $line->photos;
      $line->driver;
      $line->from_terminal = $line->from_terminal()->first();
      $line->to_terminal = $line->to_terminal()->first();
      $line->reservations = $line->reservations()
        ->where('is_cancelled', false)
        ->get();
      $line->reserved = $line->reserved();

      return $line;
    } catch(ModelNotFoundException $exception) {
      return abort(404);
    }
  }
}
