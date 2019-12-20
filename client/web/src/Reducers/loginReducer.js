const initialState = {
    username: '',
    password: ''
};

export const LoginReducer = (state = initialState, action) =>{

    switch(action.type){
        case 'USERNAME_CHANGE':
            state = {...state, username: action.value}
        break;
        case 'PASSWORD_CHANGE':
            state = {...state, password: action.value }
        break;
        default:
            return state;
    }

    return state;

}