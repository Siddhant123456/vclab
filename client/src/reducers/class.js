export const classReducer = (state = {classes : null}, action) => {
    switch (action.type) {
        case 'FETCH_CLASSES':
            return action.payload;
            
            
        case 'UPDATE':
            console.log("hello");
            console.log([...state , action.payload.result]);
            return [...state , action.payload.result]
            
    
        default:
            return state;
    }
}