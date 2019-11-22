<?php

namespace App\App;
use DataAccess\DataAccess;

class Authentication extends DataAccess
{

    public function __construct(){

        parent::__construct("TB_USERS", "id_user");

    }

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

        $user = parent::find()->filter("username = :user", [":user" => $username])->fetch();        

        var_dump($user);
        die;

    }

}