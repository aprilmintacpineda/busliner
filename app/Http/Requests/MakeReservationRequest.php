<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Contracts\Validation\Validator;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Input;

use App\Line;
use App\Reservation;

class MakeReservationRequest extends FormRequest
{
  /**
   * Determine if the user is authorized to make this request.
   *
   * @return bool
   */
  public function authorize()
  {
    return Auth::check();
  }

  public function withValidator(Validator $validator) {
    $validator->after(function() use($validator) {
      $inputs = Input::all();

      $line = Line::find($inputs['line_id']);
      $line->available_seats = $line->available_seats();

      if($line->available_seats == 0) {
        $validator->errors()->add('available_seats', 'Unable to make reservation. There are no more available seats for this line.');
      } else if($line->available_seats < $inputs['seats']) {
        $validator->errors()->add('available_seats', 'You cannot reserve for '. $inputs['seats']. ' seat'. ($inputs['seats'] > 1? 's' : '') .' because there are only '. $line->available_seats . ' seat'. ($line->available_seats > 1? 's' : '') .' available.');
      }
    });
  }

  public function messages() {
    return [
      'seats.required' => 'Number of seats is required.',
      'seats.numeric' => 'Seats must be numeric.',
      'seats.min' => 'You can\'t reserve less than 1 seat.',
      'seats.max' => 'You can\'t reserve more than 10 seats.',

      'line_id.required' => 'Line ID is required.',
      'line_id.numeric' => 'Line ID must be numeric.',
      'line_id.exists' => 'Line ID does not exists.'
    ];
  }

  protected function formatErrors(Validator $validator) {
    return [
      'seats' => $validator->errors()->get('seats'),
      'line_id' => $validator->errors()->get('line_id'),
      'available_seats' => $validator->errors()->get('available_seats')
    ];
  }

  /**
   * Get the validation rules that apply to the request.
   *
   * @return array
   */
  public function rules()
  {
    return [
      'seats' => 'bail|required|numeric|min:1|max:10',
      'line_id' => 'bail|required|numeric|exists:lines,id'
    ];
  }
}
