import React from 'react';
import { Route, Redirect } from 'react-router-dom';

export default function SafeRoute({component: Component, ...rest}) {
    return(
        // <>
        //     { (isAuthenticated) ? <Route {...props} /> : <Redirect  /> }
        // </>

        <Route {...rest} render={props => sessionStorage.getItem('token') ? (
            <Component {...props} />
            
        ) : (
            <Redirect to={{pathname: "/", state: { from: props.location }}} />
        ) }/>   
             
    );

}