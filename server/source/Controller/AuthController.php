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

        if (empty($username) || empty($password)) {
            
            $res->getBody()->write(\json_encode([
                "error"=>true,
                "msg"=>"Username and password can't be empty"
            ]));

            return $res->withStatus(400);
            
        }
        
        
        $auth = new Authentication();

        $result = $auth->login($username, $password);

        if (empty($result)) {
            
            $res->getBody()->write(\json_encode([
                "error"=>true,
                "msg"=>"User not found"
            ]));

            return $res->withStatus(403);

        }


        // return $res->withHeader("Content-Type", " application/json");

    }

}