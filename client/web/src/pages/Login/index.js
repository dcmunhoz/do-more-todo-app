import React from 'react';
import { Link } from 'react-router-dom';

import Form from './../../Components/Form';
import Input from './../../Components/Input';

import './styles.css';

export default function Login(){

    return (
        <div class="login-container">
            <div class="login-box">

                <Form>

                    <Input 
                        type="text" 
                        title="Usuário"
                        titleClass="light"
                        place="Digite seu usuário"
                        inputId="username"
                        inputName="username"
                    />

                    <Input 
                        type="text" 
                        title="Senha"
                        titleClass="light"
                        place="Digite sua senha"
                        inputId="password"
                        inputName="password"
                    />

                    

                    <button>Entrar</button>
                </Form>
                
            </div>
            <div class="welcome-box">
                <span>Do More</span>
            </div>
        </div>
    )

}