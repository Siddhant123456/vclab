import * as api from '../api/index.js';


export const updateProfile = (formData) => async (dispatch) => {
    try {
        const {data} = await api.updateProfile(formData);
        const info = {};
        
        info.result = data.result;
        
        alert("Your Data has Been Updated");
        
        dispatch({type : 'UPDATE_PROFILE' ,payload : info});
        dispatch({type : 'UPDATE_JOB' , payload : data.user});
    } catch (error) {
        console.log(error);
    }   
}