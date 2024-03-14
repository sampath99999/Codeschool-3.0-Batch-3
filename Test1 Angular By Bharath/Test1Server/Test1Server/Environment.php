<?php

namespace App;

class Environment
{
    public static function get()
    {
        return [
            "DB_HOST" => "localhost",
            "DB_NAME" => "test_admin",
            "DB_USER" => "postgres",
            "DB_PASS" => "postgres",
            "DB_PORT" => "5432",

        ];
    }
}
