import React from 'react';
import { Link } from 'react-router-dom';

import NewTodo from './Components/NewTodo';
import Todo from './Components/Todo';
 
import './style.css';

export default function Main (){


    return (
        <>
            <nav className="app-nav">
                <div className="nav-content">
                    <span className="nav-logo"> DoMore </span> <div>Options</div>
                </div>
            </nav>

            <div className="main-content">
                <div className="wrapper">
                    
                    <section className="rg-contents">

                        Secundario

                    </section>
                    
                    <section className="ct-contents">
                        
                        <header className="header-new-todo">
                            <NewTodo />
                        </header>

                        <div className="todo-list-body">

                            <header>
                                Seus TODOS
                            </header>
                            
                            <div className="list">

                                <Todo />
                                <Todo />
                                <Todo />
                                <Todo />
                                
                            </div>


                        </div>

                    </section>

                </div>
            </div>
        </>
    )

}