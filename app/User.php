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

  public function reservations(int $limit, int $offset) {
    return $this->hasMany(Reservation::class, 'user_id', 'id') 
      ->limit($limit)
      ->offset($offset)
      ->get()
      ->each(function($reservation) {
        $reservation->line;
        $reservation->line->from_terminal = $reservation->line->from_terminal()->first();
        $reservation->line->to_terminal = $reservation->line->to_terminal()->first();

        return $reservation;
      });
  }
}
