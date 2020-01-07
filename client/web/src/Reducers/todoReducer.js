const initialState = {

    todoList: [],
    shallUpdate: false

}

export const TodoReducer = (state = initialState, action) => {
    
    switch(action.type){
        case 'TODO_LIST':
            state = { ...state, todoList: action.payload };
            return state;
        break;        
        case 'UPDATE_TODO_LIST':
            state = { ...state, shallUpdate: action.payload };
            return state;
        break;
        default:
            return state;
    }

}