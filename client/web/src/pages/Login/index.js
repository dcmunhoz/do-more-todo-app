import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import api from './../../utils/api.js';

import Form from './../../Components/Form';
import Input from './../../Components/Input';

import './styles.css';

export default function Login({history}){   
    const dispatch = useDispatch();
    const [validUsername, setValidUsername] = useState(null);
    const [validPassword, setValidPassword] = useState(null);

    // States
    const { username, password } = useSelector(state => state.login);

    // Effects
    
    function validateLogin(){
        if (username === null || username === "") {
            setValidUsername(false);
            console.log(validUsername);
        } else { 
            setValidUsername(true);
        }

        if (password === null || password === "") {
            setValidPassword(false);
        } else { 
            setValidPassword(true);
        }
    }

    //Functions 
    async function handleAction() {

        validateLogin();

        console.log(validUsername);
        if (validUsername === true && validPassword === true) {
            let response = await fetch('http://localhost/login', {
                method: "post"
            });
            console.log(response);
        }

        // let response = await api.post('/login', {
        //     username,
        //     password
        // } );

        
       

    }

    function handleUserChange( el ) {

        let user = el.target.value;

        dispatch({
            type: "USERNAME_CHANGE",
            value: user
        });
        

    }

    function handlePasswordChange (el) {

        let pass = el.target.value

        dispatch({
            type: "PASSWORD_CHANGE",
            value: pass
        });

    }

    return (
        <div className="login-container">
            <div className="login-box">

                <Form>

                    <Input 
                        type="text" 
                        title="Usuário"
                        titleClass="light"
                        place="Digite seu usuário"
                        name="username"
                        value={username}
                        action={handleUserChange}
                        error={(validUsername === null) ? true : validUsername}
                    />

                    <Input 
                        type="text" 
                        title="Senha"
                        titleClass="light"
                        place="Digite sua senha"
                        name="password"
                        value={password}
                        action={handlePasswordChange}
                        error={(validPassword === null ) ? true  : validPassword}
                    />

                    <Input 
                        type="button"
                        name="btn-login"
                        value="Entrar"
                        class="btn-green"
                        action={handleAction}
                    />
                </Form>
                
            </div>
            <div className="welcome-box">
                <span>Do More</span>
            </div>
        </div>
    )

}