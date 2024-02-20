<?php

require_once("functions.php");


define("DB_HOST", "localhost");
define("DB_PORT", "5432");
define("DB_NAME", "task_tracker");
define("DB_USER", "postgres");
define("DB_PWD", "Rocky007.");

function getPDO(){
    try {
        $conStr = "pgsql:host=" . DB_HOST . ";port=" . DB_PORT . ";dbname=" . DB_NAME . ";user=" . DB_USER . ";password=" . DB_PWD;
        $pdo = new \PDO($conStr);
        $pdo->setAttribute(\PDO::ATTR_ERRMODE, \PDO::ERRMODE_EXCEPTION);
        return $pdo;
    } catch(\PDOException $e){
        http_response_code(500);
        response("Server Error");
    }
    
}