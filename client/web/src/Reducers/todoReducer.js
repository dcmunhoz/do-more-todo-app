const initialState = {

    todoList: []

}

export const TodoReducer = (state = initialState, action) => {
    
    switch(action.type){
        case 'TODO_LIST':
            state = { ...state, todoList: action.payload };
            return state;
        break;        
        default:
            return state;
    }

}