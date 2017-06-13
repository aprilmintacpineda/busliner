<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

use App\Driver;

class Line extends Model
{
  public function driver() {
    return $this->belongsTo(Driver::class, 'driver_id', 'id');
  }
}
