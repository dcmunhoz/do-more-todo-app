const initialState = {

    todoList: [],
    shallUpdate: false,
    markedDone: {
        done: false,
        id: null
    }

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
        case 'MARKED_DONE':
            state = { ...state, markedDone: { done: action.payload.done, id: action.payload.id } };
            return state;
        break;
        default:
            return state;
    }

}