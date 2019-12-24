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

            return $res->withHeader("Content-Type", "application/json;charset=utf-8")->withStatus(403);
            
        }
        
        $auth = new Authentication();

        $result = $auth->login($username, $password);

        if (isset($result['error'])) {

            $res->getBody()->write(\json_encode($result));
            return $res->withHeader("Content-Type", "application/json;charset=utf-8")->withStatus(403);

        }

        $authentication = [
            "id"   => $result['id_user'],
            "user" => $result['username'],
            "creation" => date("d/m/Y H:i:s")
        ];

        $token = \base64_encode( json_encode($authentication) );
        \session_start();
        
        if (!isset($_SESSION[SESSION_USER])) {

            $_SESSION[SESSION_USER] = $token;

        }

        $res->getBody()->write( \json_encode( [
            "auth" => true,
            "token" => $_SESSION[SESSION_USER]
        ] ) );

        return $res;

    }

    public function logout(Request $req, Response $res, array $args = []) 
    {

        unset($_SESSION[SESSION_USER]);

        $res->getBody()->write( \json_encode([
            "success" => true,
            "msg" => "User session destroyed"
        ]) );

        return $res;

    }

}