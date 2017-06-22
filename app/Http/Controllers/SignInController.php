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
      $user = Auth::user();
      if($user->is_verified) {
        return response()->json($user);
      } else {
        Auth::logout();

        return response()->json([
          'submit' => ['You must verify your email first.']
        ], 422);
      }
    }

    return response()->json([
      'submit' => ['Invalid credentials']
    ], 422);
  }

  public function logout() {
    if(Auth::check()) {
      Auth::logout();
    }

    return redirect('/sign-in')->with([
        'pop_message' => [
          'title' => 'Logged out',
          'message' => 'Your account has been successfully logged out. We hope to see you again soon.'
        ]
      ]);
  }
}
