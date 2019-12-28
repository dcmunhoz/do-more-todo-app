import React, { useState, useEffect } from 'react';

import Input from './../../../../Components/Input'

import './style.css';

export default function NewTodo(){

    const [inputing, setInputing] = useState(false);
    const [todoName, setTodoName] = useState('');

    const refInput = React.createRef();

    useEffect(()=>{

        if (inputing) {
            refInput.current.focus();
        }

    }, [inputing]);

    function handleChange(e){

        setTodoName(e.target.value)

    }

    function handleLoseFocus(e){
        
        if (!e.target.value) {
            setInputing(false);
        }

    }

    return(

        <div 
            className={`new-todo-box ${(inputing) ? 'inputing' : ''}`} 
            onClick={()=>setInputing(true)}
        >

            <span className="btn-icon" onClick={()=>setInputing(true)}>
                +
            </span>    

            <input
                type="text"
                className="input-field"
                value={todoName}
                placeholder="Novo Todo"
                onChange={handleChange}
                onFocus={()=>setInputing(true)}
                onBlur={handleLoseFocus}
                ref={refInput}
                
            />  

            <div className="add-todo-button">
                <Input 
                    type="button"
                    class="btn-add-todo"
                    value="Adicionar"
                    action={()=>alert("teste")}
                />
            </div>
            

        </div>
        
    );
}