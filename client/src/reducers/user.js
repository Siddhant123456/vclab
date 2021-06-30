export const userReducer = (state = {userProfile : null}, action) => {
    switch (action.type) {
        case 'UPDATE_JOB':
            localStorage.setItem('user' ,JSON.stringify( {...action?.payload}))
            
            return { ...state ,userProfile : action?.payload};
    
        default:
            return state;
    }


}
