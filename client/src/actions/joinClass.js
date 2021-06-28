import * as api from '../api/index.js';


export const joinClass = (formData, history) => async (dispatch) =>{
    try {
        const {data} = await api.joinClass(formData)
        alert("You are now succesfully joined in " + data.data.className + " Class")
        history.push('/');
    } catch (error) {
        alert("An error occured due to wrong information provided by you!!")
        console.log(error);
    }
}