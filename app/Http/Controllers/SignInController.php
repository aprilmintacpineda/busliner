<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Input;
use Illuminate\Support\Facades\Auth;
use App\User;
use App\Http\Requests\SignInRequest;

class SignInController extends Controller
{
  public function attempt(SignInRequest $request) {
    $inputs = Input::all();

    if(Auth::attempt([
      'email' => $inputs['email'],
      'password' => $inputs['password']
    ])) {
      return response()->json(Auth::user());
    }

    return response()->json([
      'submit' => ['Invalid credentials']
    ], 422);
  }
}
