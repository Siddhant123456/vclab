import * as api from '../api/index.js';

export const createClass = (formData,history) => async (dispatch) =>{
    try{
        const {data} = await api.newClass(formData);
        console.log(data.result);
        dispatch({type : 'UPDATE' , payload : data})
        
    }
    catch(err){
        console.log(err);
    }

}
