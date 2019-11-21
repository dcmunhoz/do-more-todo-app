import { combineReducers } from 'redux';

import { LoginReducer } from './loginReducer';

export const Reducers = combineReducers({
    login: LoginReducer
});