import mongoose from 'mongoose';
const {ObjectId} = mongoose.Schema;


const studentSchema = mongoose.Schema({

    student : {type : ObjectId , ref : 'User'},
    age : { type : Number},
    standard  : String,
    schoolName : String,
    phoneNumber : String,
    
})

export default mongoose.model("Student", studentSchema);