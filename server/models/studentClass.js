import mongoose from 'mongoose';
const {ObjectId} = mongoose.Schema;


const studentClassSchema = mongoose.Schema({
    student : {type : ObjectId , ref : 'Student'},
    classInfo  : {type : ObjectId ,  ref : 'ClassData'}
})


export default mongoose.model("StudentClass" , studentClassSchema);