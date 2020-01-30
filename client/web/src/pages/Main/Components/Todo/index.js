import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { FaCheckCircle, FaTrashAlt } from 'react-icons/fa';
import Swal from 'sweetalert2';

import api from './../../../../utils/api';

import './style.css';

export default function Todo({todo, fade}){
    const dispatch = useDispatch();
    const [todoDeleted, setTodoDeleted] = useState(false);
    const [todoDone, setTodoDene] = useState(false);

    async function handleCheckTodoAsDone() {

        const response = await api.post(`/todo/${todo.id_todo}/done`, {}, {
            headers:{
                'Authentication': sessionStorage.getItem('token')
            }
        });

        const { success } = await response.data;

        if (success) {

            setTodoDene(true);    
            setTimeout(() => {

                dispatch({
                    type: "UPDATE_TODO_LIST",
                    payload: true
                });

                setTimeout(() => {
                    setTodoDene(false);
                }, 100);

            }, 500);        

        } else {
            Swal.fire({
                title: "Ooooops =[",
                text: "Não foi possivel concluir esta operação",
                icon: 'error'
            });
            return;
        }
        

    }

    async function handleDeleteTodo() {
        const response = await api.delete(`/todo/${todo.id_todo}`, {
            headers:{
                'Authentication': sessionStorage.getItem('token')
            }
        });

        const { success } = response.data;

        if ( success ) {
            setTodoDeleted(true);        
            setTimeout( () => {

                dispatch({
                    type: 'UPDATE_TODO_LIST',
                    payload: true
                });

                setTimeout(() => {
                    setTodoDeleted(false);
                }, 100);

            }, 400);

        }

    }

    return(
        <div className={"todo-body" + ` ${ (todoDone) ? 'fade-out-todo' : ''  } ${ (todoDeleted) ? 'todo-deleted' : '' } `} >

            <div 
                className="check-button"
            >
                <FaCheckCircle onClick={()=>{ handleCheckTodoAsDone() }} />
            </div>

            <div className="todo-name">
                <input 
                    type="text" 
                    value={todo.name}
                    onChange={()=>{}}
                />
            </div>

            <div className="todo-options">
                <div
                    className="remove-button"
                >
                    <FaTrashAlt onClick={handleDeleteTodo} />
                </div>
            </div>

        </div>
    );
}