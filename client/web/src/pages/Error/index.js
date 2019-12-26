import React from 'react';
import { Link } from 'react-router-dom';


export default function Error() {

    return(
        <div>
            <h1>Ooooops !</h1>
            <span>Você não tem acesso á essa pagina</span>
            <br />
            <Link to="/">Login</Link>
        </div>       
    );

}