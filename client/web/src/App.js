import React from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import SafeRoute from './Components/SafeRoute';

import Login from './Pages/Login';
import Main from './Pages/Main';

import './style.css';

export default function App() {
    return(
        <div id="container">
            <BrowserRouter>
                <Switch>
                    <Route exact path="/" component={Login} />
                    <Route path="/main2" component={Main} />
                    <SafeRoute exact path="/main" component={Main} />
                </Switch>
            </BrowserRouter>
        </div>
    );
}