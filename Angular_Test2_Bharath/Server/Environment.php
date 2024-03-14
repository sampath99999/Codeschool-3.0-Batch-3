<?php

namespace App;

class Environment
{
    public static function get()
    {
        return [
            "DB_HOST" => "localhost",
            "DB_USER" => "postgres",
            "DB_PASS" => "postgres",
            "DB_NAME" => "blog",
            "DB_PORT" => "5432",
        ];
    }
}
