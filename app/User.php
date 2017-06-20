<?php

namespace App;

use Illuminate\Notifications\Notifiable;
use Illuminate\Foundation\Auth\User as Authenticatable;

use App\Reservation;

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

  public function reservations() {
    return $this->hasMany(Reservation::class, 'user_id', 'id');
  }
}
