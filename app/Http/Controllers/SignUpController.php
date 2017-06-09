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
use Illuminate\Support\Facades\Auth;

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
      'verify_token' => $verify_token
    ]);

    Mail::to($user->email)->send(new VerifyRegistration($verify_token));

    return response()->json([]);
  }

  public function verify($verify_token) {
    if(!Auth::check() && User::where([
      ['verify_token', '=', $verify_token],
      ['is_verified', false]
    ])->update([
      'is_verified' => true
    ])) {
      return redirect('sign-in')->with([
        'pop_message' => [
          'title' => 'Email verified!',
          'message' => 'You have successfully verified your email. You may now use your account for booking.'
        ]
      ]);
    }

    return view('landing', [
      'title' => 'Page Not Found'
    ])->with([
      'pop_message' => [
        'title' => 'Opsss... We got an error.',
        'message' => 'This page isn\' available. The link you followed may be broken, or the page may have been removed.'
      ]
    ]);
  }
}
