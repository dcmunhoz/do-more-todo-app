<?php

namespace App\App;

use DataAccess\DataAccess;
use App\App\User;
/**
 * Todo Class
 */
class Todo extends DataAccess{

    public function __construct()
    {

        parent::__construct("TB_TODOS", "ID_TODO");

    }

    /**
     * 
     * Create a new todo on DB
     * 
     */
    public function create()
    {
        $user = new User();
        $user->getAuthUser();

        $query = parent::raw(" INSERT INTO tb_todos(id_user, name, description) VALUES(:USER, :NAME, :DESC); ", [
            ":USER" => (int) $user->id_user,
            ":NAME" => (string) $this->name,
            ":DESC" => (string) $this->description
        ]);
                    
    }

}
