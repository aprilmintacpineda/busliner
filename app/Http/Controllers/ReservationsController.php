<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Input;
use Illuminate\Support\Facades\Auth;
use App\Reservation;
use App\Helpers\Generator;

use App\Http\Requests\MakeReservationRequest;
use App\Http\Requests\CancelReservationRequest;

class ReservationsController extends Controller
{
  public function make(MakeReservationRequest $request) {
    $inputs = Input::all();

    $reservation = Reservation::where([
      ['line_id', '=', $inputs['line_id']],
      ['user_id', '=', Auth::user()->id]
    ])->update([
      'is_cancelled' => false,
      'seats' => $inputs['seats']
    ]);

    if(!$reservation) {
      $reservation = Reservation::create([
        'trace_number' => Generator::id(),
        'line_id' => $inputs['line_id'],
        'user_id' => Auth::user()->id,
        'seats' => $inputs['seats']
      ]);
    } else {
      $reservation = Reservation::where([
        ['line_id', '=', $inputs['line_id']],
        ['user_id', '=', Auth::user()->id]
      ])->first();
    }

    return response()->json('
      You have successfully made a reservation for '. $inputs['seats'] .' seat'. ($inputs['seats'] > 1? 's' : '') .'. your reservation trace number is '. $reservation->trace_number .', please write it down and present it to the cashier on the terminal. Please come 15 minutes before the time of departure. Thank you for travelling with us.
    ');
  }

  public function cancel(CancelReservationRequest $request) {
    $inputs = Input::all();

    Reservation::where([
      ['line_id', '=', $inputs['line_id']],
      ['user_id', '=', Auth::user()->id]
    ])->update([
      'is_cancelled' => true,
      'cancelled_at' => Generator::current_timestamp()
    ]);

    return response()->json('You have successfully cancelled your reservation. We hope to travel with you soon.');
  }

  public function list($page) {
    $limit = 10;
    $offset = ($limit * $page) - $limit;

    return response()->json(Auth::user()
      ->reservations()
      ->limit($limit)
      ->offset($offset)
      ->get());
  }
}
