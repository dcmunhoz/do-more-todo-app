<?php

namespace App\App;

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

            return \json_encode([
                "error"=>true,
                "msg"=>"User not found"
            ]);

        }

        $validate = \password_verify($password, $result['password']);

        if (!$validate) {
            return \json_encode([
                "error" => true,
                "msg"   => "Login failed"
            ]);

        }

        return $result;

    }

}