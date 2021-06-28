export const classReducer = (state = {classes : null}, action) => {
    switch (action.type) {
        case 'FETCH_CLASSES':
            return action.payload;
            
            
        case 'UPDATE':
            return [...state , action.payload]
            
    
        default:
            return state;
    }
}