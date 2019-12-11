<?php

namespace App\App;

use Psr\Http\Message\ResponseInterface as Response;
use Psr\Http\Message\ServerRequestInterface as Request;
use App\App\User;

class Authentication
{

    /**
     * 
     * User login
     * 
     * @param string $username Username
     * @param string $password Password
     * 
     */ 
    public function login($username, $password)
    {

        $user = new User;

        $result = $user->find()->filter("username = :username", [":username" => $username])->fetch();

        if (!$result) {

            return [
                "error"=>true,
                "msg"=>"User not found"
            ];

        }

        $validate = \password_verify($password, $result['password']);

        if (!$validate) {
            return [
                "error" => true,
                "msg"   => "Login failed"
            ];

        }

        return $result;

    }

    /**
     * 
     * Verify if user is authenticated
     * 
     * @param Request $req HTTP Request data
     * 
     */
    public static function isAuth(Request $req) {

        $headers  = $req->getHeaders();

        if (!isset( $headers['Authentication'] )) {

            return [
                "error" => true,
                "msg" => "Authentication token not found"
            ];

        }

        $userToken = $headers["Authentication"][0];
        
        \session_start();
        if (!isset($_SESSION[SESSION_USER]) || $_SESSION[SESSION_USER] === null || $_SESSION[SESSION_USER] === "") {

            return [
                "error" => true,
                "msg" => "User not authenticated"
            ];
            
        }
        
        $userSession = $_SESSION[SESSION_USER];

        if ($userToken !== $userSession) {

            return [
                "error" => true,
                "msg" => "Token is different from user logged"
            ];
            
        }

    }

}