import mongoose from 'mongoose';
const {ObjectId} = mongoose.Schema;


const studentSchema = mongoose.Schema({

    student : {type : ObjectId , ref : 'User'},
    age : { type : Number},
    class  : String,
    schoolName : String,
    phoneNumber : String,
})

export default mongoose.model("Student", studentSchema);