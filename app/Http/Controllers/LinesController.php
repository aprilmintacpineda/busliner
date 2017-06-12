<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

use App\Line;

class LinesController extends Controller
{
  public function get($page) {
    $limit = 10;
    $offset = ($page * $limit) - $limit;

    return Line::offset($offset)
      ->limit($limit)
      ->get();
  }
}
