<?php

namespace App\Controller;

use Psr\Http\Message\ResponseInterface as Response;
use Psr\Http\Message\ServerRequestInterface as Request;

use App\App\User;

class UserController
{

    public function create(Request $req, Response $res, array $args = []) 
    {

        $body = $req->getParsedBody();
        $username = $body['username'];
        $password = $body['password'];
        $name     = $body['name'];
        $email    = $body['email'];

        $user = new User();

        $user->username = $username;
        $user->password = $password;
        $user->name = $name;
        $user->email = $email;

        $result = $user->create();

        if (isset($result['error'])) {

            $res->getBody()->write(json_encode([
                $result
            ]));

            return $res->withStatus(403);

        }    

        $res->getBody()->write(\json_encode([
            "success"=>true,
            "msg"=>"User {$user->username} successfully created"
        ]));

        return $res;
        
    }

}