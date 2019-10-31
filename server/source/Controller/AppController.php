<?php

namespace App\Controller;

use Psr\Http\Message\ResponseInterface as Response;
use Psr\Http\Message\ServerRequestInterface as Request;
use App\Core\Controller;

class AppController extends Controller{


    public function home(Request $req, Response $res, array $args){

        $response = \json_encode(["Ok?" => true]);
        $res->getBody()->write($response);

        return $res->withHeader("Content-Type", "application/json");

    }

}