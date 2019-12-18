<?php

namespace App\Controller;

use Psr\Http\Message\ResponseInterface as Response;
use Psr\Http\Message\ServerRequestInterface as Request;

use App\Core\Controller;
use App\App\Todo;
use App\App\User;
use App\App\Group;

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
        $todo->findById($args['todoId']);
        $result = $todo->validateUser();

        if (isset($result['error'])) {

            $res->getBody()->write(\json_encode($result));
            return $res->withStatus(403);

        }

        $todo->delete();

        $res->getBody()->write(\json_encode([
            "success"=>"true",
            "msg"=>"Todo deleted"
        ]));

        return $res;

    }

    public function markTodoDone(Request $req, Response $res, array $args = [])
    {

        $todo = new Todo();
        $todo->findById($args['todoId']);
        $result = $todo->validateUser();

        if (isset($result['error'])) {

            $res->getBody()->write(\json_encode($result));
            return $res->withStatus(403);

        }

        $todoDone = $todo->done();

        if (isset($todoDone['error'])) {

            $res->getBody()->write(\json_encode($todoDone));
            return $res->withStatus(400);

        }

        $res->getBody()->write(\json_encode($todoDone));
        return $res;
        
    }

    public function updateTodo(Request $req, Response $res, array $args = [])
    {
        $todo = new Todo();
        $todo->findById($args['todoId']);
        $result = $todo->validateUser();

        if (isset($result['error'])) {

            $res->getBody()->write(\json_encode($result));
            return $res->withStatus(403);

        }
        
        $body = $req->getParsedBody();
        $todo->name = $body['name'];
        $todo->desc = $body['desc'];
        $todo->update();

        $res->getBody()->write(\json_encode([
            "success" => true,
            "msg" => "Todo updated"
        ]));    
    
        return $res;

    }

    public function createGroup(Request $req, Response $res, array $args = [])
    {

        $body = $req->getParsedBody();
        $group = new Group();
        $user = new User();

        $user->getAuthUser();

        $group->name = $body['name'];
        $group->user = $user;
        $group->create();

        $res->getBody()->write(\json_encode([
            "success" => true,
            "msg"     => "Group succefuly created"
        ]));

        return $res;


    }

    public function addTodoOnGroup(Request $req, Response $res, array $args = [])
    {

        $idGroup = $args['idGroup'];
        $idTodo = $args['idTodo'];

        $group = new Group();
        $group->findById($idGroup);

        if ( $group->id_group === NULL ) {
            
            $res->getBody()->write(\json_encode([
                "error"=>true,
                "msg"=>"Group doesn't exists!"
            ]));

            return $res->withStatus(500);

        }

        $todo = new Todo();
        $todo->findById($idTodo);

        if ( $todo->id_todo === NULL ) {
            
            $res->getBody()->write(\json_encode([
                "error"=>true,
                "msg"=>"Todo doesn't exists!"
            ]));

            return $res->withStatus(500);

        }

        $group->id_todo = $todo->id_todo;
        $result = $group->addTodoOnGroup();

        if (isset($result['error'])) {
            $res->getBody()->write(\json_encode($result));
            return $res->withStatus(500);
        }

        $res->getBody()->write(\json_encode([
            "success"=>true,
            "msg"=>"Todo added on group {$group->name}"
        ]));

        return $res;

    }

    public function removeTodoFromGroup(Request $req, Response $res, array $args = [])
    {

        $idGroup = $args['idGroup'];
        $idTodo = $args['idTodo'];
        
        $group = new Group();
        $group->findById($idGroup);

        if ( $group->id_group === NULL ) {
            
            $res->getBody()->write(\json_encode([
                "error"=>true,
                "msg"=>"Group doesn't exists!"
            ]));

            return $res->withStatus(500);

        }

        $todo = new Todo();
        $todo->findById($idTodo);

        if ( $todo->id_todo === NULL ) {
            
            $res->getBody()->write(\json_encode([
                "error"=>true,
                "msg"=>"Todo doesn't exists!"
            ]));

            return $res->withStatus(500);

        }

        $group->id_todo = $todo->id_todo;
        $result = $group->removeTodoFromGroup();

        if (isset($result['error'])) {
            $res->getBody()->write(\json_encode($result));
            return $res->withStatus(500);
        }

        $res->getBody()->write(\json_encode([
            "success" => true,
            "msg" => "Todo removed from group"
        ]));
        
        return $res;

    }

}