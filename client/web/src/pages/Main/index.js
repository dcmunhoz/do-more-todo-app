import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';

import NewTodo from './Components/NewTodo';
import Todo from './Components/Todo';

import api from './../../utils/api';
 
import './style.css';

export default function Main (){
    const todos = useSelector(store => store.todo);
    const dispatch = useDispatch();

    const [todoList, setTodoList] = useState([]);

    useEffect( () => {

        loadTodos().then(response => {
            
            setTodoList(response);
            
        });

        dispatch({
            type: 'UPDATE_TODO_LIST',
            payload: false
        });

    }, [todos.shallUpdate]);

    function loadTodos(){
        return new Promise( async (resolve, reject) => {

            api.get('/todo', {
                headers: {
                    'Authentication': sessionStorage.getItem('token')
                }
            }).then(({data}) => {

                resolve(data);

            }).catch(error=>{

                reject(error);

            });

        });
    }
    
    return (
        <>
            <nav className="app-nav">
                <div className="nav-content">
                    <span className="nav-logo"> DoMore </span> <div>Options</div>
                </div>
            </nav>

            <div className="main-content">
                <div className="wrapper">
                    
                    {/* <section className="rg-contents">

                        Secundario

                    </section> */}
                    
                    <section className="ct-contents">
                        
                        <header className="header-new-todo">
                            <NewTodo />
                        </header>

                        <div className="todo-list-body">

                            <header>
                                Seus TODOS
                            </header>
                            
                            <div className="list">
                                
                                { (todoList.length === 0 ) ? (
                                    <div className="no-todo">
                                        Nenhum TODO a ser exibido.
                                    </div>
                                ) : (
                                    todoList.map(todo => <Todo key={todo.id_todo} todo={todo} /> )
                                ) }

                            </div>


                        </div>

                    </section>

                </div>
            </div>
        </>
    )

}