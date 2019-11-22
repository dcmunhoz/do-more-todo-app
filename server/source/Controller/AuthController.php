<?php

namespace App\Controller;

use Psr\Http\Message\ResponseInterface as Response;
use Psr\Http\Message\ServerRequestInterface as Request;
use App\Core\Controller;
use App\App\Authentication;

class AuthController extends Controller
{
    
    public function login(Request $req, Response $res, array $args = [])
    {
        
        $body = $req->getParsedBody();
        $username = $body['username'];
        $password = $body['password'];

        $auth = new Authentication();

        $auth->login($username, $password);

        // return $res->withHeader("Content-Type", " application/json");

    }

}