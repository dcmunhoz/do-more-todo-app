import { combineReducers } from 'redux';

import { LoginReducer } from './loginReducer';
import { AuthReducer } from './authReducer';
import { TodoReducer } from './todoReducer'

export const Reducers = combineReducers({
    login: LoginReducer,
    auth: AuthReducer,
    todo: TodoReducer
});