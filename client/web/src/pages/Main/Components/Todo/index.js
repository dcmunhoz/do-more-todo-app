import React, {useState, useEffect} from 'react';
import { FaCheckCircle, FaTrashAlt } from 'react-icons/fa';

import './style.css';

export default function Todo(){

    
    return(
        <div className="todo-body">

            <div className="check-button">
                <FaCheckCircle />
            </div>

            <div className="todo-name">
                <input 
                    type="text" 
                    value="Todo Name"
                />
            </div>

            <div className="todo-options">
                <div>
                    <FaTrashAlt />
                </div>
            </div>

        </div>
    );
}