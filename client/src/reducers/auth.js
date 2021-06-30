
export const authReducer = (state = {authData : null},action) =>{
    switch (action.type) {
        case 'AUTH':
            localStorage.setItem('profile' ,JSON.stringify( {...action?.payload}))
            let isStudent = true;
            if(action.payload.result.isTeacher === true){
                isStudent = false;
            }
            
            if(isStudent){
                localStorage.setItem('job' ,'student');
            }
            else{
                localStorage.setItem('job', 'teacher');
            }


            return { ...state ,authData : action?.payload};

        
        case 'LOGOUT':
            
            localStorage.clear()
            
            return { ...state ,authData : null};

        case 'UPDATE_PROFILE':
            localStorage.setItem('profile' ,JSON.stringify( {...action?.payload}))
            
            return { ...state ,authData : action?.payload};

            
        default:
            
            return state
    }
}
