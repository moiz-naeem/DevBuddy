const validator = require("validator");
const rateLimit = require('express-rate-limit');

const validateSignUpData = (req) => {
  const { firstName, lastName, email, password } = req.body;
  if (!firstName || !lastName) {
    throw new Error("Name is not valid");
  } else if (!validator.isEmail(email)) {
    throw new Error("Email is not valid");
  } else if (!validator.isStrongPassword(password)) {
    throw new Error(
      "Password is not strong enough please include lowercase, uppercase, number and special character and make sure length greater than seven"
    );
  }else if(password.length < 8 || password.length > 50 ){
    throw new Error("The password length range is 8-50 characters")
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
