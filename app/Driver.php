<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

use App\Line;

class Driver extends Model
{
  public function lines() {
    return $this->hasMany(Line::class, 'driver_id', 'id');
  }
}
