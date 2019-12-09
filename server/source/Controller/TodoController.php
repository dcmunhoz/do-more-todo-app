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

    public function deleteTodo(Request $req, Response $res, array $args = [])
    {

        $todo = new Todo();
        $user = new User();
        $user->getAuthUser();
        $todo->findById($args['todoId']);

        if ((int) $user->id_user !== (int) $todo->id_user) {

            $res->getBody()->write(\json_encode([
                "error"=>true,
                "msg"=>"User logged is diferent from todo owner !"
            ]));

            return $res->withStatus(403);

        }

        $todo->delete();

        $res->getBody()->write(\json_encode([
            "success"=>"true",
            "msg"=>"Todo deleted"
        ]));

        return $res;

    }

}