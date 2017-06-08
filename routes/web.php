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

/*
|--------------------------------------------------------------------------
| Sign up routes
|--------------------------------------------------------------------------
| routes used for ajax sign-up
*/
Route::post('sign-up', 'SignUpController@store');

Route::get('/', 'LandingController@index');
Route::get('{slug}', 'LandingController@slug')
  ->where('slug', '.*?');