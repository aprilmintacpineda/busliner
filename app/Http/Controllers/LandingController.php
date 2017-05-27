<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

class LandingController extends Controller
{
  public function index() {
    return view('landing', [
      'title' => 'Safe travel with us!',
      'map' => true
    ]);
  }

  public function slug() {
    return abort(404);
  }
}
