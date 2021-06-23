import {CREATECLASS} from '../constants/actionTypes';
import * as api from '../api/index.js';

export const createClass = (formData,history) => async (dispatch) =>{
    try{
        const {data} = await api.newClass(formData);
        alert("Class Code is : " + data.code);
        history.push('/dashboard')
        
    }
    catch(err){
        console.log(err);
    }

}
