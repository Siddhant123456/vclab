export const classReducer = (classes =  [], action) => {
    switch (action.type) {
        case 'FETCH_CLASSES':
            return action.payload;
            
            
        case 'UPDATE':
            return [...classes , action.payload.result]
        
        case 'REMOVE_CLASS':
            const classInfos = [...classes];
            let ind;
            classInfos.map((item,index) => {
                if(item._id === action.payload){
                    ind = index;
                }


                return ""
            })
            classInfos.splice(ind,1);
            return classInfos;

            
    
        default:
            return classes;
    }
}