<?php
namespace App\Helpers;

class Generator {
  public static function id() {
    return rand(111111111, 999999999);
  }

  public static function current_timestamp() {
    return date('Y-d-m H:i:s');
  }
}