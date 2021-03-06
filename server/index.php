<?php

/** Start file */

use Psr\Http\Message\ResponseInterface as Response;
use Psr\Http\Message\ServerRequestInterface as Request;
use Psr\Http\Server\RequestHandlerInterface as RequestHandler;
use Slim\Factory\AppFactory;
use Slim\Psr7\Response as Res;

use App\Controller\AuthController;
use App\Controller\UserController;
use App\Controller\TodoController;

use App\App\Authentication;

require __DIR__ . '/vendor/autoload.php';

$app = AppFactory::create();

$app->addErrorMiddleware(true, true, true);

$app->add(function(Request $req, RequestHandler $handler){
    $contentType = $req->getHeaderLine('Content-Type');

    if (strstr($contentType, 'application/json')) {
        $contents = json_decode(file_get_contents('php://input'), true);
        if (json_last_error() === JSON_ERROR_NONE) {
            $req = $req->withParsedBody($contents);
        }
    }    

    $response = $handler->handle($req);

    return $response
        ->withHeader('Access-Control-Allow-Origin', SITE_URL)
        ->withHeader('Access-Control-Allow-Headers', 'X-Requested-With, Content-Type, Accept, Origin, Authorization, Authentication')
        ->withHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS')
        ->withHeader('Access-Control-Allow-Credentials', 'true');
});

$app->options('/{routes:.+}', function ($request, $response, $args) {
    return $response;
});

$app->post('/login', AuthController::class . ":login");
$app->post('/user/create', UserController::class . ":create");

/** 
 * 
 * Routes that need authentication
 * 
 */
$app->group("", function($group){
    
    $group->get('/logout', AuthController::class . ":logout");

    /** TODO Routes */
    $group->get('/todo', TodoController::class . ":listTodo");
    $group->post('/todo/add', TodoController::class . ":createTodo");
    $group->delete('/todo/{todoId}', TodoController::class . ":deleteTodo");
    $group->post('/todo/{todoId}', TodoController::class . ":updateTodo");
    $group->post('/todo/{todoId}/done', TodoController::class . ":markTodoDone");

    /** GROUP Routes */
    $group->post('/group/add', TodoController::class . ":createGroup");

    $group->post('/group/{idGroup}/todo/{idTodo}', TodoController::class . ":addTodoOnGroup");
    
    $group->delete('/group/{idGroup}/todo/{idTodo}', TodoController::class . ":removeTodoFromGroup");

})->add(function (Request $req, RequestHandler $handler) {

    /**
     * 
     * Middleware to verify if user is authenticated
     * 
     */

    $return = Authentication::isAuth($req);

    if (isset($return['error'])) {

        $response = new Res();
        $response->getBody()->write(json_encode($return));
        return $response->withHeader("Content-Type", "application/json;charset=utf-8")->withStatus(403);

    }

    $response = $handler->handle($req);

    return $response;

});

$app->map(['GET', 'POST', 'PUT', 'DELETE', 'PATCH' ], '/{routes:.+}', function ($request, $response) {
    throw new HttpNotFoundException($request);
});

$app->run();