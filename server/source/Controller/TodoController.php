<?php

namespace App\Controller;

use Psr\Http\Message\ResponseInterface as Response;
use Psr\Http\Message\ServerRequestInterface as Request;

use App\Core\Controller;
use App\App\Todo;

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

}