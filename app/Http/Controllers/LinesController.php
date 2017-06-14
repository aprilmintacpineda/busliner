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
      ->orderBy('schedule', 'desc')
      ->get();

    foreach($lines as $line) {
      $line->terminal;
    }

    return $lines;
  }

  public function show($id) {
    try {
      $line = Line::findOrFail($id);
      $line->photos;
      $line->driver;

      return $line;
    } catch(ModelNotFoundException $exception) {
      return abort(404);
    }
  }
}
