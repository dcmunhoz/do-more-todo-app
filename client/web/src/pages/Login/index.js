import React from 'react';

import Form from './../../Components/Form';
import Input from './../../Components/Input';

import './styles.css';

export default function Login({history}){

    function handleAction() {

        history.push('/main');

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

                    <Input 
                        type="button"
                        inputId="btn-login"
                        inputName="btn-login"
                        value="Entrar"
                        inputClass="btn-green"
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