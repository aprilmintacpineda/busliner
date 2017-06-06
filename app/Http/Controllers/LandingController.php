<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

class LandingController extends Controller
{
  public function index() {
    return view('landing', [
      'title' => 'Reach your destination with maximum security.',
      'map' => true
    ]);
  }

  public function slug($slug) {
    switch($slug) {
      case 'sign-up':
        $title = 'Create your account and reserve a seat now.';
      break;

      default:
        $title = 'Reach your destination with maximum security.';
      break;
    }

    return view('landing', [
      'title' => $title
    ]);
  }
}
