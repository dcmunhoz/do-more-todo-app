<?php

/** 
 * 
 * Config File
 * 
 * Backend configurations will be inserted in this file
 * 
 */

define("DATA_ACCESS", [
    "driver"   => "mysql",
    "host"     => "localhost",
    "port"     => "3306",
    "dbname"   => "domore",
    "user"     => "domore",
    "password" => "domore@",
    "options"  => [
        PDO::ATTR_ERRMODE => PDO::ERRMODE_EXCEPTION,
        PDO::ATTR_DEFAULT_FETCH_MODE => PDO::FETCH_OBJ,
    ]
  ]);