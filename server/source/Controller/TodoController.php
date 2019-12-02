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
        
        $todo = new Todo();       

        die;

    }

}