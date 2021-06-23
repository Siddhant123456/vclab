import mongoose from 'mongoose';
const {ObjectId} = mongoose.Schema;

const teacherSchema = mongoose.Schema({

    teacher : {
        type: ObjectId, ref: 'User',
    },   
    schoolName : String,
    description : String,
    age : Number,
    qualifications : String,
    phoneNumber : String,
    


})

export default mongoose.model("Teacher",teacherSchema);