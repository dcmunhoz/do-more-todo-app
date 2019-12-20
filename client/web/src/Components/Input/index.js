import React from 'react';

import './style.css';

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
                    className={"btn " + props.class || null}
                    onClick={props.action}
                > {props.value || null} </button>
            ) : null}
            

        </div>
        
    )

}

export default Input;