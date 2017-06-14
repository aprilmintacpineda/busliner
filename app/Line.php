<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

use App\Driver;
use App\Photo;

class Line extends Model
{
  public function driver() {
    return $this->belongsTo(Driver::class, 'driver_id', 'id');
  }

  public function photos() {
    return $this->hasMany(Photo::class, 'line_id', 'id');
  }

  public function terminal() {
    return $this->hasOne(Terminal::class, 'id', 'terminal_id');
  }
}
