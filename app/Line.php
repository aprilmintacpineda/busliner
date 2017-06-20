<?php

namespace App;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Facades\Auth;

use App\Driver;
use App\Photo;
use App\Reservation;

class Line extends Model
{
  public function driver() {
    return $this->belongsTo(Driver::class, 'driver_id', 'id');
  }

  public function photos() {
    return $this->hasMany(Photo::class, 'line_id', 'id');
  }

  public function from_terminal() {
    return $this->hasOne(Terminal::class, 'id', 'from_terminal');
  }

  public function to_terminal() {
    return $this->hasOne(Terminal::class, 'id', 'to_terminal');
  }

  public function reservations() {
    return $this->hasMany(Reservation::class, 'line_id', 'id');
  }

  public function reserved() {
    return Auth::check() && $this->hasMany(Reservation::class, 'line_id', 'id')
      ->where([
        ['user_id', '=', Auth::user()->id],
        ['is_cancelled', false]
      ])->first()? true : false;
  }
}
