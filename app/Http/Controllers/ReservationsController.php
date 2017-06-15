<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Input;

class ReservationsController extends Controller
{
  public function reserve() {
    $inputs = Input::all();

    return response()->json('
      You have successfully made a reservation for '. $inputs['seats'] .' seat'. ($inputs['seats'] > 1? 's' : '') .'. your trace number is 123123123, please write it down and present it to the cashier on the terminal. Please come 15 minutes before the time of departure. Thank you for travelling with us.
    ');
  }
}
