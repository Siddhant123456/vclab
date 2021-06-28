import mongoose from 'mongoose';
const {ObjectId} = mongoose.Schema;


const classSchema = mongoose.Schema({
    teacher : {
        type : ObjectId,
        ref : "Teacher"
    },
    students : {
        type : [ObjectId],
        ref : "Student"
    },
    classCode : String,
    className : String,
    classDesc : String,
    classStandard : String,
    classDuration : {
        type : String
    }


})

export default mongoose.model("ClassData" , classSchema);