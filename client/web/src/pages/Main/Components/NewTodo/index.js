import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Swal from 'sweetalert2';

import Input from './../../../../Components/Input';

import api from './../../../../utils/api';

import './style.css';

export default function NewTodo(){

    const dispatch = useDispatch();

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

    async function addTodo() {

        if (!todoName) {
    
            Swal.fire({
                title: "Ops",
                icon: 'error',
                text: 'É necessário informar um nome para o TODO'
            });

        }else { 


            try {

                let response = await api.post("/todo/add", {
                    name: todoName,
                    desc: ""
                }, {
                    headers: {
                        'Content-Type': "application/json;charset=utf-8"
                    }
                });
    
                if (response.data.success) {
    
                    Swal.fire({
                        title: "Parabens ! :D",
                        text: `TODO ${todoName} inserido com sucesso`,
                        icon: 'success'
                    });

                    

                    setTodoName('');
                    refInput.current.blur();
    
                }
    
            } catch(error) { 
    
                console.log(error.response);
    
            }

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
                    action={addTodo}
                />
            </div>
            

        </div>
        
    );
}