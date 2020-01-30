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
        default:
            return state;
    }

}