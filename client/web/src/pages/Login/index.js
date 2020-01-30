import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import api from './../../utils/api.js';


import Swal from 'sweetalert2';

import Form from './../../Components/Form';
import Input from './../../Components/Input';

import './styles.css';

export default function Login({history}){   

    const dispatch = useDispatch();

    const [validUsername, setValidUsername] = useState(true);
    const [validPassword, setValidPassword] = useState(true);

    // States
    const { username, password } = useSelector(state => state.login);

    function validateUsername(){
        if (username === null || username === "") {
            setValidUsername(false);
        } else { 
            setValidUsername(true);
        }
    }

    function validatePassword(){
        if (password === null || password === "") {
            setValidPassword(false);
        } else { 
            setValidPassword(true);
        }

    }

    async function handleAction() {

        sessionStorage.removeItem('token');

        validateUsername();
        validatePassword();

        if ((username != null && username != "") && (password != null && password != "")) {

            try {

                let response = await api.post("/login", {username, password}, {
                    headers: {
                        'Content-Type': "application/json;charset=utf-8"
                    }
                });
                
                let { token } = response.data;

                sessionStorage.setItem("token", token);
                await dispatch({
                    type: "AUTH_USER",
                    value: { token, isAuthenticated: true }
                });
                
                history.push('/main');

            } catch(error) {


                if (error.response) {

                    const { msg } = error.response.data;
    
                    Swal.fire({
                        title: 'Oooops! =[',
                        text: msg,
                        icon: 'error'
                    })

                } else { 

                    Swal.fire({
                        title: 'Oooops! =[',
                        text: 'Não foi possivel se conectar !',
                        icon: 'error'
                    })
                    
                }
                

            }

        }

    }

    function handleUserChange( el ) {

        let user = el.target.value;

        dispatch({
            type: "USERNAME_CHANGE",
            value: user
        });

    }

    async function handlePasswordChange (el) {

        let pass = el.target.value

        await dispatch({
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
                        error={validUsername}
                    />

                    <Input 
                        type="password" 
                        title="Senha"
                        titleClass="light"
                        place="Digite sua senha"
                        name="password"
                        value={password}
                        action={handlePasswordChange}
                        error={validPassword}
                    />

                    <Input 
                        type="button"
                        name="btn-login"
                        value="Entrar"
                        class="btn-login"
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