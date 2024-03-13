<?php

namespace App;

class Environment
{
    public static function get()
    {
        return [
            "DB_HOST" => "localhost",
            "DB_USER" => "postgres",
            "DB_PASS" => "root",
            "DB_NAME" => "royMeet",
            "DB_PORT" => "5433",
        ];
    }
}
