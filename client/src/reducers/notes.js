


export const notesReducer = (userNotes = [], action) => {
    switch (action.type) {
        case 'CREATE_NOTE':
            return [...userNotes , action.payload];
        
        case 'FETCH_NOTES':
            return action.payload;

        case 'DELETE_NOTE':
            const notes = [...userNotes];
            let ind;
            notes.map((item,index) => {
                
                if(item._id === action.payload){
                    ind = index;
                }
                return "";
                
            })
            notes.splice(ind , 1);
            return notes;
    
        default:
            return userNotes;
    }


}
