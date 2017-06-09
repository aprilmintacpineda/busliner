<?php

namespace App\Http\Controllers;

use App\Http\Requests\SignUpRequest;
use App\User;
use App\Helpers\Generator;
use App\Mail\VerifyRegistration;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Mail;
use Illuminate\Support\Facades\Input;
use Illuminate\Support\Facades\Hash;

class SignUpController extends Controller
{
  public function store(SignUpRequest $request) {
    $verify_token = str_random(75);
    $inputs = Input::all();

    $user = User::create([
      'id' => Generator::id(),
      'email' => $inputs['email'],
      'password' => Hash::make($inputs['password']),
      'first_name' => $inputs['first_name'],
      'middle_name' => $inputs['middle_name'],
      'surname' => $inputs['surname'],
      'verify_token' => Hash::make($verify_token)
    ]);

    Mail::to($user->email)->send(new VerifyRegistration($verify_token));

    return response()->json([]);
  }
}
