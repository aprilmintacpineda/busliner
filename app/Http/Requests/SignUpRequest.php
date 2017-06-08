<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Support\Facades\Input;
use Illuminate\Contracts\Validation\Validator;

class SignUpRequest extends FormRequest
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

  /**
 * Get the error messages for the defined validation rules.
 *
 * @return array
 */
  public function messages() {
    return [
      'first_name.required' => 'First name is required.',
      'middle_name.required' => 'Middle name is required.',
      'surname.required' => 'Surname is required.',

      'email.required' => 'Email is required.',
      'email.email' => 'Email is invalid.',
      'email.unique' => 'Email already registered.',

      'password.required' => 'Password is required.',
      'password.min' => 'Password is too weak.',
      'password.max' => 'Password is too long.',

      'password_again.required' => 'Enter your password again.',
      'password_again.same' => 'Passwords do not match.'
    ];
  }

  /**
 * Configure the validator instance.
 *
 * @param  \Illuminate\Validation\Validator  $validator
 * @return void
 */
  public function withValidator($validator) {
    $validator->after(function($validator) {
      $inputs = Input::all();

      // further validation of first name
      if(isset($inputs['first_name']) && !empty($inputs['first_name'])) {
        if(!preg_match('/(^[a-zA-Z ]+$)/', $inputs['first_name'])
        || preg_match('/( {2,})/', $inputs['first_name'])
        || strlen($inputs['first_name']) <= 2
        || strlen($inputs['first_name']) > 75) {
          $validator->errors()->add('first_name', 'First name is invalid.');
        }
      }

      if(isset($inputs['middle_name']) && !empty($inputs['middle_name'])) {
        if(!preg_match('/(^[a-zA-Z ]+$)/', $inputs['middle_name'])
        || preg_match('/( {2,})/', $inputs['middle_name'])
        || strlen($inputs['middle_name']) <= 2
        || strlen($inputs['middle_name']) > 75) {
          $validator->errors()->add('middle_name', 'Middle name is invalid.');
        }
      }

      if(isset($inputs['surname']) && !empty($inputs['surname'])) {
        if(!preg_match('/(^[a-zA-Z ]+$)/', $inputs['surname'])
        || preg_match('/( {2,})/', $inputs['surname'])
        || strlen($inputs['surname']) <= 2
        || strlen($inputs['surname']) > 75) {
          $validator->errors()->add('surname', 'Surname is invalid.');
        }
      }
    });
  }

  protected function formatErrors(Validator $validator) {
    return [
      'first_name' => $validator->errors()->get('first_name'),
      'middle_name' => $validator->errors()->get('middle_name'),
      'surname' => $validator->errors()->get('surname'),
      'email' => $validator->errors()->get('email'),
      'password' => $validator->errors()->get('password'),
      'password_again' => $validator->errors()->get('password_again')
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
      'first_name' => 'bail|required',
      'middle_name' => 'bail|required',
      'surname' => 'bail|required',
      'email' => 'bail|required|email|unique:users,email',
      'password' => 'bail|required|min:6|max:255',
      'password_again' => 'bail|required|same:password'
    ];
  }
}
