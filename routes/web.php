<?php

/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
|
| Here is where you can register web routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| contains the "web" middleware group. Now create something great!
|
*/

use App\Http\Middleware\VerifyCsrfToken;

/*
|--------------------------------------------------------------------------
| Sign up, sign in routes
|--------------------------------------------------------------------------
| routes used for ajax sign-up, email verification
*/
Route::post('sign-up', 'SignUpController@store');
Route::get('sign-up/verify/{verify_token}', 'SignUpController@verify');
Route::post('sign-in', 'SignInController@attempt');

Route::get('/lines/{page}', 'LinesController@get');

Route::get('/', 'LandingController@index');
Route::get('{slug}', 'LandingController@slug')
  ->where('slug', '.*?');