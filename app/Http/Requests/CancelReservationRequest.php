<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Contracts\Validation\Validator;
use Illuminate\Support\Facades\Auth;

class CancelReservationRequest extends FormRequest
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

  public function messages() {
    return [
      'line_id.required' => 'Line ID is required.',
      'line_id.numeric' => 'Line ID must be numeric.',
      'line_id.exists' => 'Line ID does not exists.'
    ];
  }

  protected function formatErrors(Validator $validator) {
    return [
      'line_id' => $validator->errors()->get('line_id')
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
