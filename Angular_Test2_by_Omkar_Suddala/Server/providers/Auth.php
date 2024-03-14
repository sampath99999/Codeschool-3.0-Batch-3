<?php

namespace App\providers;

class Auth
{
    private $user;
    public function setUser($user)
    {
       return $this->user = $user;
    }
    public function user()
    {
        return $this->user;
    }
}
