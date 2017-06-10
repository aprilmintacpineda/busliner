<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class LandingController extends Controller
{
  public function index() {
    if(Auth::check()) {
      return view('landing', [
        'title' => 'Reach your destination with maximum security.',
        'map' => true,
        'logged_in_user' => Auth::user()
      ]);
    }

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

    if(Auth::check()) {
      return view('landing', [
        'title' => $title,
        'logged_in_user' => Auth::user()
      ]);
    }

    return view('landing', [
      'title' => $title
    ]);
  }
}
