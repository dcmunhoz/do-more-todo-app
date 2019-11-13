import React from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';


import Login from './Pages/Login/';
import Main from './Pages/Main/';

import './style.css';

export default function App() {
    return(
        <div id="container">
            <BrowserRouter>
                <Switch>
                    <Route path="/" exact={true} component={Login} />
                    <Route path="/main" component={Main} />
                </Switch>
            </BrowserRouter>
        </div>
    );
}