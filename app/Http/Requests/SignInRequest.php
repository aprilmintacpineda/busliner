<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Contracts\Validation\Validator;
use Illuminate\Support\Facades\Inputs;

class SignInRequest extends FormRequest
{
  /**
   * Determine if the user is authorized to make this request.
   *
   * @return bool
   */
  public function authorize()
  {
    return true;
  }

  public function messages() {
    return [
      'email.required' => 'Email is required.',
      'email.email' => 'Email is invalid.',

      'password.required' => 'Password is required.'
    ];
  }

  protected function formatErrors(Validator $validator) {
    return [
      'email' => $validator->errors()->get('email'),
      'password' => $validator->errors()->get('password')
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
      'email' => 'bail|required|email',
      'password' => 'bail|required'
    ];
  }
}
