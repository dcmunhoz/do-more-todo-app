<?php

namespace App\App;

use DataAccess\DataAccess;

class User extends DataAccess
{

    public function __construct()
    {

        parent::__construct("tb_users", "id_user");
        
    }

    /**
     * 
     * Creates a new user
     * 
     */
    public function create()
    {

        $userExists = parent::raw("SELECT username FROM tb_users WHERE username = :username",[ ":username" => $this->username ]);

        if (count($userExists) >= 1) {

            return [
                "error" => true,
                "msg" => "User exists"
            ];

        }

        $newPass = \password_hash($this->password, PASSWORD_DEFAULT, ['cost' => 12]);

        $this->password = $newPass;

        parent::raw("INSERT INTO tb_users(username, password, name, email) VALUES(:username, :password, :name, :email)", [
            ":username" => $this->username,
            ":password" => $this->password,
            ":name"     => $this->name,
            ":email"    => $this->email
        ]);

        $userId = parent::raw("SELECT LAST_INSERT_ID() as ID")[0];
        $result = parent::raw("SELECT * FROM tb_users WHERE id_user = :id", [":id" => $userId['ID']])[0];
        
        $this->setData($result);

        return $result;

    }

    public function getAuthUser()
    {
        $token = $_SESSION[SESSION_USER];
        $tokeData = \json_decode(\base64_decode($token));

        $this->findById($tokeData->id);

    }

}
