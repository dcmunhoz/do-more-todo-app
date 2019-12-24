import React from 'react';

import './style.css';

import loading from './../../Assets/loading.gif';

const Input = (props) => {
    
    return (        
        <div className="form-group">

            {/* Text / Password */}
            {(props.type !== "button" && props.type !== "submit") ? (
                <>
                    {(props.title) ? <label 
                    htmlFor={`${props.name}`}
                    className={`${(!props.error) ? 'input-error' : null } ${props.titleClass}`}

                    > {props.title} </label> : null } 

                    <input 
                        type={props.type} 
                        placeholder={props.place || null} 
                        id={props.name || null} 
                        name={props.name || null}
                        className={(!props.error) ? 'input-error' : null }
                        value={props.value}
                        onChange={props.action}
                    />
                </>
            ) : null }            

            {/** Buttons */}
            {(props.type === 'button' || props.type === 'submit') ? (
                <button 
                    type={props.type} 
                    id={props.name || null} 
                    name={props.name || null}
                    className={`btn ${props.class} `}
                    onClick={props.action}
                    disabled={(props.disabled)}
                > { (props.disabled) ? (<img src={loading} className="loading-button-image"></img>) : props.value } </button>
            ) : null}
            

        </div>
        
    )

}

export default Input;