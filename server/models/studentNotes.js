import mongoose from 'mongoose';
const {ObjectId} = mongoose.Schema;


const studentNotes = mongoose.Schema({
    student : {
        type : ObjectId,
        ref : 'Student'
    },
    note : {
        type : String
    },
    createdAt : {
        type : String,
    }
})


export default mongoose.model("StudentNotes" , studentNotes);