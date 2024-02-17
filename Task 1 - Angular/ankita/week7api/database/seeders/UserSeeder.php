<?php

namespace Database\Seeders;

use App\Models\User;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class UserSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
$users=[['user_types_id'=>1,'name'=>'angela','email'=>'angela@gmail.com','password'=>'f495b400db54e6dec5bf2a7f6d40fd56'],['user_types_id'=>2,'name'=>'ankita','email'=>'ankita@gmail.com','password'=>'1138dd6fdda5d617dfe218898ee02077']];

        User::insert($users);
    }
}
