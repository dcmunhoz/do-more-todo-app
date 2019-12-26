const initialState = {
    isAuthenticated: false,
    token: ''
}

export const AuthReducer = (state = initialState, action) =>{

    switch(action.type){
        case 'AUTH_USER':
            state = { ...state,...action.value };
        break;
        default:
            return state;
    }

    return state;

}