<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Contracts\Validation\Validator;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Input;

use App\Reservation;

class RedoReservationRequest extends FormRequest
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

  public function withValidator($validator) {
    $validator->after(function() use($validator) {
      $inputs = Input::all();

      if(!Reservation::where([
        ['line_id', '=', $inputs['line_id']],
        ['user_id', '=', Auth::user()->id]
      ])->first()) {
        $validator->errors()->add('line_id', 'Reservation does not exists.');
      }
    });
  }

  public function messages() {
    return [
      'line_id.required' => 'Line ID is required.',
      'line_id.exists' => 'Line ID does not exists.',
      'line_id.numeric' => 'Line ID must only be a number.'
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
      'line_id' => 'bail|required|numeric|exists:lines,id'
    ];
  }
}
