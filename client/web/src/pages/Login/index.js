import React from 'react';
import { Link } from 'react-router-dom';

import Form from './../../Components/Form';

import './styles.css';

export default function Login(){

    return (
        <div class="login-container">
            <div class="login-box">

                <Form>
                    <input type="text"/>
                    <input type="text"/>

                    <button>Entrar</button>
                </Form>
                
            </div>
            <div class="welcome-box">
                <span>Do More</span>
            </div>
        </div>
    )

}