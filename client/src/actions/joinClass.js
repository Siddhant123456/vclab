import * as api from '../api/index.js';


export const joinClass = (formData, history) => async (dispatch) =>{
    try {
        const {data} = await api.joinClass(formData)
        alert("You are now succesfully joined in " + data.className + "'s Class")
        dispatch({type : 'UPDATE', payload : {result :data}})

    } catch (error) {
        console.log(error);
    }
}

export const leaveClass = (id,history,user) => async (dispatch) => {
    try {
        const {data} = await api.leaveClass(id,user);
        console.log(data);
        dispatch({type : 'REMOVE_CLASS' , payload : id});
        history.push('/dashboard');

    } catch (error) {
        
    }
}