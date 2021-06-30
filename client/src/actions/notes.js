import * as api from '../api/index.js';


export const notes = (formData) => async (dispatch) =>{
    try {
        let {data} = await api.createNote(formData);
        dispatch({type : 'CREATE_NOTE' ,payload : data});
    } catch (error) {
        console.log(error);
    }   


}

export const fetchNotes = (id) => async (dispatch) => {
    try {
        const {data} = await api.fetchNotes(id);
        dispatch({type : 'FETCH_NOTES' , payload : data});
    } catch (error) {
        console.log(error);
    
    
    }
}

export const deleteNote = (id) => async (dispatch) => {
    try {
        const {data} = await api.deleteNote(id);
        console.log(data);
        dispatch({type : 'DELETE_NOTE' , payload : id});
    } catch (error) {
        console.log(error);
    }
}
