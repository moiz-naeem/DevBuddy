const validator = require("validator");
const rateLimit = require('express-rate-limit');

const validateSignUpData = (req) => {
  const { firstName, lastName, email, password } = req.body;
  if (!firstName || !lastName) {
    return res.status(400).json({message: "Name is not valid", status: "fail"});;
  } else if (!validator.isEmail(email)) {
    return res.status(400).json({message: "Email is not valid ", status: "fail"});
  } else if (!validator.isStrongPassword(password)) {
    return res.status(400).json({message: "Password must be at least 8 characters long and include one uppercase, one lowercase, one number, and one special character. ", status: "fail"});
  }else if(password.length < 8 || password.length > 50 ){
    return res.status(400).json({message: "The password length range is 8-50 characters ", status: "fail"});
  }
};

const checkValidBody = (bodyFields, allowedFields) => {
  return Object.keys(bodyFields).every((key) =>  allowedFields.includes(key))
}

const isObjectEmpty = (objectName) => {
  return (
    !objectName ||
    (Object.keys(objectName).length === 0 && objectName.constructor === Object)
  );
};


const loginLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, 
  max: 5, 
  message: "Too many login attempts. Please try again later.",
});







module.exports = {validateSignUpData, checkValidBody, isObjectEmpty, loginLimiter}
