<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

use App\Line;

class LinesController extends Controller
{
  public function get($page) {
    $limit = 10;
    $offset = ($page * $limit) - $limit;

    return Line::where([
        ['is_cancelled', false],
        ['is_completed', false],
        ['has_left', false]
      ])->offset($offset)
      ->limit($limit)
      ->orderBy('destination', 'asc')
      ->get();
  }

  public function show($id) {
    return Line::find($id);
  }
}
