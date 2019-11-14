import React from 'react';

import './style.css';

const Input = (props) => {

    return (
        
        <div className="form-group">

            <label 
                htmlFor={`${props.inputName}`}
                className={`${props.titleClass}`}

            > {props.title} </label>
            <input 
                type={`${props.type}`} 
                placeholder={`${props.place}`} 
                id={`${props.inputId}`} 
                name={`${props.inputName}`} 
            />

        </div>
        
    )

}

export default Input;