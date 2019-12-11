<?php

namespace App\App;

use DataAccess\DataAccess;

/**
 * Todo Groups class
 */
class Group extends DataAccess
{

    public function __construct()
    {
        parent::__construct("TB_GROUPS", "ID_GROUP");
    }

    /**
     * 
     * Create new Group
     * 
     */
    public function create()
    {   

        $result = parent::raw("INSERT INTO tb_groups(id_user, name) VALUES(:id_user, :name)", [
            ":id_user" => (int)    $this->user->id_user,
            ":name"    => (string) $this->name
        ]);

    }
}