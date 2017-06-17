<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Reservation extends Model
{
  public $fillable = [
    'trace_number',
    'line_id',
    'user_id',
    'seats'
  ];
}
