
import Student from "../models/student.js";
import User from "../models/user.js";
import StudentNotes from "../models/studentNotes.js";

export const createNote = async (req,res) => {
    const {id , note} = req.body;
    const student = await Student.findOne({student : id});
    var todayDate = new Date().toISOString().slice(0, 10);
    const newNote = await StudentNotes.create({
        student : student._id,
        note : note,
        createdAt : todayDate
    });
    const myNote = await StudentNotes.findOne({_id: newNote._id});

    res.status(200).json(myNote);
}

export const fetchNotes = async (req,res) => {
    const {id} = req.params;
    const student = await Student.findOne({student: id});
    if(!student){
        res.status(404).json({message : "You are Not a Registered Student"});
    }
    const notes = await StudentNotes.find({student : student._id});
    res.status(200).json(notes);


}


export const deleteNote = async (req,res) => {
    const {id} = req.params;

    const removedNote = await StudentNotes.deleteOne(
        {_id : id}
    )
    
    res.status(200).json(removedNote);
}