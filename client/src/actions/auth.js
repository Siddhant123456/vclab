import * as api from '../api/index.js';


export const signin = (formData,history) => async (dispatch) => {
    try {
        const {data} = await api.signIn(formData)
        const info = {}
        info.result = data.result;
        info.token = data.token;
        
        dispatch({type : 'AUTH' ,payload : info});
        dispatch({type : 'UPDATE_JOB' , payload : data.user});
        history.push('/')
    } catch (error) {
        console.log(error.message);
    }
}

export const signup = (formData,history) => async (dispatch) => {
    
    try {
        
        
        const {data} = await api.signUp(formData)
        const info = {}
        info.result = data.result;
        info.token = data.token;
        
        dispatch({type : 'AUTH' ,payload  : info});
        dispatch({type : 'UPDATE_JOB' , payload : data.user});
        history.push('/')
    } catch (error) {
        console.log(error);
    }
}

