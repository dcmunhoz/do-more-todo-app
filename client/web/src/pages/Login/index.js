import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';

import Form from './../../Components/Form';
import Input from './../../Components/Input';

import './styles.css';

export default function Login({history}){   
    const dispatch = useDispatch();

    // States
    const { username, password } = useSelector(state => state.login);

    // Effects

    //Functions 
    function handleAction() {

        history.push('/main');

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
                    />

                    <Input 
                        type="text" 
                        title="Senha"
                        titleClass="light"
                        place="Digite sua senha"
                        name="password"
                        value={password}
                        action={handlePasswordChange}
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