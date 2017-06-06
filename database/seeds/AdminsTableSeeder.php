<?php

use Illuminate\Database\Seeder;

use App\Helpers\Generator;
use App\Admin;

class AdminsTableSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
      $super_admin = new Admin;
      $super_admin->id = Generator::id();
      $super_admin->first_name = 'April';
      $super_admin->middle_name = 'Mintac';
      $super_admin->surname = 'Pineda';
      $super_admin->type = 1;
      $super_admin->employee_id = '123-456-789';
      $super_admin->username = '123_april_789';
      $super_admin->password = 'this is a very long password.';
      $super_admin->save();
    }
}
