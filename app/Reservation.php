<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

use App\Line;

class Reservation extends Model
{
  public $fillable = [
    'trace_number',
    'line_id',
    'user_id',
    'seats'
  ];

  public function line() {
    return $this->belongsTo(Line::class, 'line_id', 'id');
  }
}
