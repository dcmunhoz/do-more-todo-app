<?php

namespace App\Controller;

use Psr\Http\Message\ResponseInterface as Response;
use Psr\Http\Message\ServerRequestInterface as Request;

use App\Core\Controller;
use App\App\Todo;
use App\App\User;

/**
 * Todo routes controller
 */
class TodoController extends Controller{
    
    public function createTodo(Request $req, Response $res, array $args = []) 
    {
        
        $body = $req->getParsedBody();

        $todo = new Todo();       
        $todo->name = $body['name'];
        $todo->desc = $body['desc'];
        $todo->create();
        
        $res->getBody()->write(\json_encode([
            "success"=>true,
            "msg" => "Todo created"
        ]));

        return $res;

    }

    public function listTodo(Request $req, Response $res, array $args = [])
    {

        $todo = new Todo();
        $user = new User();
        $user->getAuthUser();

        $result = $todo->find()->filter("id_user = :id_user", [":id_user" => $user->id_user])->fetch(true);

        $res->getBody()->write(\json_encode($result));

        return $res;
    }

}