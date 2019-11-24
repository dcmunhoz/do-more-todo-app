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

        if (count($result) <= 0) {

            return;

        }

        $user->setData($result);

        var_dump($user->username);
        die;

        return $result;

    }

}