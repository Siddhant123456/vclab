import ClassData from "../models/classData.js";
import Teacher from "../models/teacher.js";

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
  const existingUser = await Teacher.findOne({ teacher: userInfo.result._id });

  const result = await ClassData.create({
    teacher: existingUser,
    classCode: classId,
    className: name,
    classDesc: desc,
    classStandard: standard,
    classDuration: duration,
  });

  res.status(200).json({code : classId});
};
