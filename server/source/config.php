<?php

/** 
 * 
 * Config File
 * 
 * Backend configurations will be inserted in this file
 * 
 */

// error_reporting(E_ALL);
// ini_set('display_errors', 1);

header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Headers: *");

define("DATA_ACCESS", [
    "driver"   => "mysql",
    "host"     => "localhost",
    "port"     => "3306",
    "dbname"   => "domore",
    "user"     => "domore",
    "password" => "domore@",
    "options"  => [
        PDO::ATTR_ERRMODE => PDO::ERRMODE_EXCEPTION,
        PDO::ATTR_DEFAULT_FETCH_MODE => PDO::FETCH_ASSOC,
    ]
]);

define("SESSION_USER", 'Authentication');

date_default_timezone_set("America/Sao_Paulo");