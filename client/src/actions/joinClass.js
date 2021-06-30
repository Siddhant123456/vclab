import * as api from '../api/index.js';


export const joinClass = (formData, history) => async (dispatch) =>{
    try {
        const {data} = await api.joinClass(formData)
        alert("You are now succesfully joined in " + data.className + "'s Class")
        console.log(data);
        dispatch({type : 'UPDATE', payload : {result :data}})

    } catch (error) {
        console.log(error);
    }
}