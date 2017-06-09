<?php

namespace App\Mail;

use Illuminate\Bus\Queueable;
use Illuminate\Mail\Mailable;
use Illuminate\Queue\SerializesModels;
use Illuminate\Contracts\Queue\ShouldQueue;

class VerifyRegistration extends Mailable
{
  use Queueable, SerializesModels;

  public $verify_token;

  /**
   * Create a new message instance.
   *
   * @return void
   */
  public function __construct($verify_token)
  {
    $this->verify_token = $verify_token;
  }

  /**
   * Build the message.
   *
   * @return $this
   */
  public function build()
  {
    return $this->view('emails.verifyRegistration', [
      'verification_link' => env('APP_URL') . '/sign-up/verify/' . $this->verify_token
    ]);
  }
}
