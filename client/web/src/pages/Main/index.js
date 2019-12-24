import React from 'react';
import { Link } from 'react-router-dom';

export default function Main (){

    return (
        <>
            <h1>Main Page</h1>
            <span> { sessionStorage.getItem('token') } </span>
            <Link to="/" > Login </Link>
        </>
    )

}