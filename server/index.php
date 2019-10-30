<?php

use Psr\Http\Message\ResponseInterface as Response;
use Psr\Http\Message\ServerRequestInterface as Request;
use Slim\Factory\AppFactory;

require __DIR__ . './vendor/autoload.php';


$app = AppFactory::create();

$app->get('/', function(Request $req, Response $res, $args){

    $res->getBody()->write("Olá Mundo !");

    return $res;

});

$app->run();