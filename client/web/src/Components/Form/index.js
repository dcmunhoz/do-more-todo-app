import React from 'react';

import './style.css';

const Form = (props) => {
    return(
        <form action={props.action} className={props.className}>
            {props.children}
        </form>
    )
}

export default Form;