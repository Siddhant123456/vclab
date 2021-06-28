import * as api from '../api/index.js';

export const classes = (id) => async (dispatch) =>{
    try {
        const {data} = await api.fetchClasses(id);
        console.log(data);
        dispatch({type : 'FETCH_CLASSES' , payload : data});
    } catch (error) {
        console.log(error);
    }
}