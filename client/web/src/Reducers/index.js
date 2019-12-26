import { combineReducers } from 'redux';

import { LoginReducer } from './loginReducer';
import { AuthReducer } from './authReducer';

export const Reducers = combineReducers({
    login: LoginReducer,
    auth: AuthReducer
});