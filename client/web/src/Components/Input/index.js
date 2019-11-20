import React, {useState, useEffect} from 'react';

import './style.css';

const Input = (props) => {

    let [ inputValue, setInputValue ] = useState('');

    useEffect(() => {

    }, []);

    function handleChangeInput(el) {
        setInputValue(el.target.value)
    }

    return (
        
        <div className="form-group">

            {/* Text / Password */}
            {(props.type !== "button" && props.type !== "submit") ? (
                <>
                    <label 
                    htmlFor={`${props.inputName}`}
                    className={`${props.titleClass}`}

                    > {props.title} </label>

                    <input 
                        type={props.type} 
                        placeholder={props.place || null} 
                        id={props.inputId || null} 
                        name={props.inputName || null}
                        value={inputValue}
                        onChange={handleChangeInput}
                    />
                </>
            ) : null }            

            {/** Buttons */}
            {(props.type === 'button' || props.type === 'submit') ? (
                <button 
                    type={props.type} 
                    id={props.inputId || null} 
                    name={props.inputName || null}
                    className={"btn " + props.inputClass || null}
                    onClick={props.action}
                > {props.value || null} </button>
            ) : null}
            

        </div>
        
    )

}

export default Input;