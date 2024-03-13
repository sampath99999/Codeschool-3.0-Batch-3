<?php

namespace App\providers;

class Auth
{
    private $user;
//    private $admin;
    public function setUser($user)
    {
       return $this->user = $user;
    }
    public function user()
    {
        return $this->user;
    }
    public function setAdmin($admin)
    {
        return $this->admin = $admin;
    }

    public function admin(){
        return $this->admin;
    }

}
