import ClassData from "../models/classData.js";
import Teacher from "../models/teacher.js";
import StudentClass from "../models/studentClass.js";
import User from "../models/user.js";
import Student from '../models/student.js';
function generateUID() {
  // I generate the UID from two parts here
  // to ensure the random number provide enough bits.
  var firstPart = (Math.random() * 46656) | 0;
  var secondPart = (Math.random() * 46656) | 0;
  firstPart = ("000" + firstPart.toString(36)).slice(-3);
  secondPart = ("000" + secondPart.toString(36)).slice(-3);
  return firstPart + secondPart;
}

export const createClass = async (req, res) => {
  const classId = generateUID();
  const { name, desc, standard, duration, userInfo } = req.body;
  console.log(userInfo);
  const existingUser = await Teacher.findOne({ teacher: userInfo.result._id });

  const result = await ClassData.create({
    teacher: existingUser,
    classCode: classId,
    className: name,
    classDesc: desc,
    classStandard: standard,
    classDuration: duration,
  });

  res.status(200).json({result});
};


export const joinClass =  async (req,res) => {
    const {code, id} = req.body;
    const result = await ClassData.findOne({classCode : code});
    if(!result){
      
      return res.status(404).json({message  : "Class Code invalid"});
    }
    
    const userInfo = await User.findOne({_id : id});
    
   
    const isStudent = await Student.findOne({student : userInfo});
    
    if(!isStudent){
      return res.status(404).json({message : "You are Not a registered Student"});

    }
    
    
    const isExists = await StudentClass.findOne({student : isStudent ,classInfo :result});
    
    if(isExists){
      return res.status(404).json({message : "You are already present in this class"});

    }
    const enterStudent = await StudentClass.create({
      student : isStudent._id, 
      classInfo : result._id
    })
    await ClassData.updateOne(
      {classCode : code} ,
      { $push : {students : isStudent._id}}
    );
    res.status(200).json({data : result});

    

    
}

export const fetchClass = async (req,res) => {
  
  const profile = await User.findOne({_id : req.params.id});
  if(!profile){
    return res.status(404).json({message : "You are not a registered user"});
  }
  if(profile.isStudent){
    const studentProf = await Student.findOne({student : req.params.id});

    const myData = await ClassData.find({students : studentProf._id});

    return res.status(200).json(myData);
  }
  else{
    const teacherProf = await Teacher.findOne({teacher : req.params.id});
    const allClass = await ClassData.find({teacher : teacherProf._id});
    return res.status(200).json(allClass);
  }

    
}
