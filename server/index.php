<?php

/** Start file */

use Psr\Http\Message\ResponseInterface as Response;
use Psr\Http\Message\ServerRequestInterface as Request;
use Slim\Factory\AppFactory;

use App\Controller\AuthController;
use App\Controller\UserController;

require __DIR__ . '/vendor/autoload.php';

$app = AppFactory::create();

$app->addErrorMiddleware(true, true, true);

/** User Authentication */
$app->post('/login', AuthController::class . ":login");
$app->get('/logout', AuthController::class . ":logout");

/** User */
$app->post('/user/create', UserController::class . ":create");

$app->run();