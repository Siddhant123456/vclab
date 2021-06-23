import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import User from "../models/user.js";
import Teacher from '../models/teacher.js'
import Student from '../models/student.js'
export const signin = async (req, res) => {
  const { email, password } = req.body;
  

  try {
    const existingUser = await User.findOne({ email });

    if (!existingUser) {
      return res.status(404).json({ message: "User Does Not Exist!!" });
    }
    const isPasswordCorrect = await bcrypt.compare(
      password,
      existingUser.password
    );
    if (!isPasswordCorrect) {
      return res.status(400).json({message : "Invalid Password"});
    }
    const token = jwt.sign({email :existingUser.email , id : existingUser._id  },'test',{expiresIn :"1h"})

    res.status(200).json({result: existingUser,token})
  } catch (error) {
      res.status(500).json({message :"Something went Wrong"});
  }
};

export const signup = async (req, res) => {
    const {email,password,confirmPassword,firstName,lastName,profile} = req.body;
    try {
        const existingUser = await User.findOne({email});
        if(existingUser){
            return res.status(404).json({ message: "User Already Exists" });
        }
        if(password != confirmPassword){
            return res.status(404).json({ message: "Password and Confirm Password Does not Match" });
        }
        const hashedPassword = await bcrypt.hash(password, 12);
        let isStudent = false;
        let isTeacher = false;
        if(profile === "student"){
        
          isStudent = true;
        }
        else{
          isTeacher = true;
        }
        const result = await User.create({email,password :hashedPassword ,name :`${firstName} ${lastName}`,isStudent : isStudent, isTeacher : isTeacher})
        const token = jwt.sign({email :result.email , id : result._id  },'test',{expiresIn :"1h"})

        if(profile === "student"){
          const student = await Student.create({student : result});
        
        }
        else{
          const teacher = await Teacher.create({teacher : result});
        }
        res.status(200).json({result: result,token})
  
    } catch (error) {
        res.status(500).json({message :"Something went Wrong"});
 
    }

};
