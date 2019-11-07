import React from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';


import Login from './pages/Login';
import Main from './pages/Main';

import './style.css';

export default function App() {
    return(
        <BrowserRouter>
            <Switch>
                <Route path="/" exact={true} component={Login} />
                <Route path="/main" component={Main} />
            </Switch>
        </BrowserRouter>
    );
}