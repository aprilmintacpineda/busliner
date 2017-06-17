<?php

namespace App;

use Illuminate\Notifications\Notifiable;
use Illuminate\Foundation\Auth\User as Authenticatable;

class User extends Authenticatable
{
  public $remember_token = false;

  public $fillable = [
    'id',
    'email',
    'password',
    'first_name',
    'middle_name',
    'surname',
    'verify_token'
  ];

  protected $hidden = [
    'password',
    'email',
    'verify_token'
  ];
}
