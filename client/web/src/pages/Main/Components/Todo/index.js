import React, {useState, useEffect} from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { FaCheckCircle, FaTrashAlt } from 'react-icons/fa';
import Swal from 'sweetalert2';


import api from './../../../../utils/api';

import './style.css';

export default function Todo({todo, fade}){
    const storeTodo = useSelector(store => store.todo);
    const dispatch = useDispatch();
    const [fadeOut, setFadeOut] = useState('');
    const [todoDeleted, setTodoDeleted] = useState(false);

    useEffect(()=>{

        const {done} = storeTodo.markedDone;

        if (done) {
            
            setFadeOut('fade-out-todo');

            setTimeout(() => {
                dispatch({
                    type: "UPDATE_TODO_LIST",
                    payload: true
                });

                setTimeout(() => {
                    dispatch({
                        type: 'MARKED_DONE',
                        payload: {
                            done: false,
                            id: null
                        }
                    });
                }, 100);
            }, 500);

        }

    }, [storeTodo.markedDone]);

    useEffect(() => {

        async function deleteTodo(){
            if (todoDeleted) {

                const response = await api.delete(`/todo/${todo.id_todo}`, {
                    headers:{
                        'Authentication': sessionStorage.getItem('token')
                    }
                });
    
                const { success } = response.data;

                if ( success ) {
                
                    setTimeout( () => {

                        setTodoDeleted(false);
    
                        dispatch({
                            type: 'UPDATE_TODO_LIST',
                            payload: true
                        });
        
        
                    }, 400);

                }

    
            }
        }

        deleteTodo();

    }, [todoDeleted] );

    async function handleCheckTodoAsDone() {

        const response = await api.post(`/todo/${todo.id_todo}/done`, {}, {
            headers:{
                'Authentication': sessionStorage.getItem('token')
            }
        });

        const { success } = await response.data;

        if (success) {

            dispatch({
                type: 'MARKED_DONE',
                payload: {
                    done: true,
                    id: todo.id_todo
                }
            });
            

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
        
        setTodoDeleted(true);

    }

    return(
        <div className={"todo-body" + ` ${ (todo.id_todo == storeTodo.markedDone.id) ? fadeOut : ''  } ${ (todoDeleted) ? 'todo-deleted' : '' } `} >

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