const mongoose = require("mongoose");
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const validator = require('validator')

const userSchema = new mongoose.Schema(
  {
    firstName: {
      type: String,
      required: true,
      lowercase: true,
      trim: true,
      minLength: [3, `Minimum length of first name is three got {VALUE}`],
      maxLength: [50, `Maximum length of first name is 50 got {VALUE}`],
    },
    lastName: {
      type: String,
      required: true,
      lowercase: true,
      trim: true,
      minLength: [3, `Minimum length of last name is 3 three got {VALUE}`],
      maxLength: [50, `Maximum length of first name is 50 got {VALUE}`],
    },
    email: {
      type: String,
      unique: true,
      required: [true, "Email is required"],
      lowercase: true,
      trim: true,
      maxLength: [100, `Why such a long email it exceeds max length of 100`],
      validate: {
        validator: function(value) {
            if(!validator.isEmail(value)){
                throw new Error("Invalid email address " +  value)
            }
        }
      }
    },
    password: {
      type: String,
      required: [true, "Can not continue without password"],
      validate :{
        validator: function(value) {
            if(!validator.isStrongPassword(value)){
                throw new Error("Password is not strong enough make sure to include lowercase, uppercase, number and a special character")
            }
        }
      }
    },
    age: { type: Number, min: [12, "Minimum age to register is 12"] },
    about: {
      type: String,
      trim: true,
      lowercase: true,
      maxLength: [
        200,
        "Stop being self centered the max length for about section is 200",
      ],
      default: "Too lazy to ad something about myself",
    },
    skills: { type: [String] },
    gender: {
      type: String,
      lowercase: true,
      validate: {
        validator: function(value) {
          return ["male", "female", "others"].includes(value);
        },
        message: "Gender must be one of the following: male, female, or others",
      },
    },
    photourl: {
      type: String,
      default:
        "https://static.vecteezy.com/system/resources/thumbnails/048/334/475/small_2x/a-person-icon-on-a-transparent-background-png.png",
    },
  },
  { timestamps: true }
);

userSchema.methods.getJWT = async function (){
  const user = this;
  const jwtToken = await jwt.sign({_id : user._id}, "deVbuDdy!2@", {expiresIn : '7d'}) 
  return jwtToken
}

userSchema.methods.verifyPassword = async function (plainPassword){
  const user = this;
  const isValid = await bcrypt.compare(plainPassword, user.password)
  return isValid;
}
module.exports = mongoose.model("User", userSchema);
