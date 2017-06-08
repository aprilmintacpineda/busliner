<?php

namespace App\Http\Controllers;

use App\Http\Requests\SignUpRequest;
use Illuminate\Http\Request;

class SignUpController extends Controller
{
  public function store(SignUpRequest $request) {
    return response()->json([]);
  }
}
