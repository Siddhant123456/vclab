import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import User from "../models/user.js";
import Teacher from "../models/teacher.js";
import Student from "../models/student.js";
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
      return res.status(400).json({ message: "Invalid Password" });
    }
    const token = jwt.sign(
      { email: existingUser.email, id: existingUser._id },
      "test",
      { expiresIn: "1h" }
    );
    let profileData;
    if(existingUser.isStudent){
      profileData = await Student.findOne({student : existingUser._id}); 
      
    }
    else{
      profileData = await Teacher.findOne({teacher : existingUser._id}); 
    
    }

    res.status(200).json({ result: existingUser, token , user : profileData});
  } catch (error) {
    res.status(500).json({ message: "Something went Wrong" });
  }
};

export const signup = async (req, res) => {
  const { email, password, confirmPassword, firstName, lastName, profile } =
    req.body;
  try {
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(404).json({ message: "User Already Exists" });
    }
    if (password != confirmPassword) {
      return res
        .status(404)
        .json({ message: "Password and Confirm Password Does not Match" });
    }
    const hashedPassword = await bcrypt.hash(password, 12);
    let isStudent = false;
    let isTeacher = false;
    if (profile === "student") {
      isStudent = true;
    } else {
      isTeacher = true;
    }
    const result = await User.create({
      email,
      password: hashedPassword,
      name: `${firstName} ${lastName}`,
      isStudent: isStudent,
      isTeacher: isTeacher,
    });
    const token = jwt.sign({ email: result.email, id: result._id }, "test", {
      expiresIn: "1h",
    });
    let profileData;
    if (profile === "student") {
      const student = await Student.create({ student: result });
      profileData = await Student.findOne({student : result._id}); 
    
    } else {
      const teacher = await Teacher.create({ teacher: result });
      profileData = await Teacher.findOne({teacher : result._id}); 
    
    }
    res.status(200).json({ result: result, token , user : profileData});
  } catch (error) {
    res.status(500).json({ message: "Something went Wrong" });
  }
};

export const updateProfile = async (req, res) => {
  const { id, name, email, age, schoolName, phoneNumber } = req.body;
  const job = await User.findOne({ _id: id });
  if (job.isStudent) {
    const { standard } = req.body;
    const updatedData = await Student.findOneAndUpdate(
      { student: id },
      {
        $set: {
          age: age,
          standard: standard,
          schoolName: schoolName,
          phoneNumber: phoneNumber,
        },
      }
    );

    await User.findOneAndUpdate({ _id: id }, { $set: { name: name } });
    const userData = await User.findOne({_id : id});
    const profileData = await Student.findOne({student : id});
    res.status(200).json({result : userData , user : profileData});

  } else {
    const { description, qualifications } = req.body;

    const updatedData = await Teacher.findOneAndUpdate(
      { teacher: id },
      {
        $set: {
          age: age,
          description: description,
          schoolName: schoolName,
          phoneNumber: phoneNumber,
          qualifications : qualifications
        },
      }
    );
    await User.findOneAndUpdate({ _id: id }, { $set: { name: name } });
    const userData = await User.findOne({_id : id});
    const profileData = await Teacher.findOne({teacher : id}); 
    res.status(200).json({result : userData , user : profileData});

  }
};
