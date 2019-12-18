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

    /**
     * 
     * Add a todo to a group
     * 
     */
    public function addTodoOnGroup()
    {

        $validation = parent::raw("SELECT * FROM tb_groupxtodos WHERE id_group = :id_group AND id_todo = :id_todo",[
            ":id_group"=>$this->id_group,
            ":id_todo" =>$this->id_todo
        ]);

        if ( count($validation) >= 1 ) {

            return [ 
                "error" => true,
                "msg"   => "Todo already on group"
            ];

        }

        $result = parent::raw("INSERT INTO tb_groupxtodos(id_group, id_todo) VALUES(:group, :todo) ",[
            ":group" => (int) $this->id_group,
            ":todo"  => (int) $this->id_todo
        ]);

        return $result;

    }

    /**
     * 
     * Remove a todo grom group
     * 
     */
    public function removeTodoFromGroup()
    {

        $verify = parent::raw("SELECT count(*) AS QTDE FROM tb_groupxtodos WHERE id_group = :group AND id_todo = :todo",[
            ":group" => (int) $this->id_group,
            ":todo"  => (int) $this->id_todo
        ])[0];

        if (!$verify['QTDE'] >= 1) {
            return [
                "error" => true,
                "msg" => "Todo not on group"
            ];
        }

        parent::raw("DELETE FROM tb_groupxtodos WHERE id_group = :group AND id_todo = :todo",[
            ":group" => (int) $this->id_group,
            ":todo"  => (int) $this->id_todo
        ]);

    }
}