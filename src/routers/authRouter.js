const {validateSignUpData, checkValidBody} = require('../utils/validation.js');
const User = require('../models/User')
const bcrypt = require('bcrypt')
const validator = require('validator')


const express = require('express')


const authRouter = express.Router();


authRouter.post("/signup",  async (req, res) => {
  try{
    const containNecessaryFields =  checkValidBody(req.body, ["firstName", "lastName", "email", "password"]) 
    if(!containNecessaryFields){
      throw new Error("We only need firstName, lastName, email and password")
    }
    const{firstName, lastName, email, password} = req.body;
    validateSignUpData(req)
    const hashedPassword = await bcrypt.hash(password, 10)
    const user =  new User({
      firstName,
      lastName,
      email,
      password: hashedPassword
    });

    await user.save();
    return res.send(`${user.firstName} added successfully!`)
  }catch(error){
    return res.status(400).send("User registration unsuccessful " + error);
  }
  
})



authRouter.post("/login", async (req, res) => {
  try{
    const{email, password} = req.body;
    if(!validator.isEmail(email) || !password || (password.trim().length === 0) ){
      return res.status(400).send("Invalid input. Please provide a valid email and password.")
    }
    
    const user =  await User.findOne({email : email});
    if(!user){
      return res.status(401).send("Invalid Credentials")
    }
    const isValid = await user.verifyPassword(password);

    if(!isValid){
      return res.status(401).send("Invalid Credentials")

    }

    const token = await user.getJWT();
    res.cookie("token" ,  token, {expires: new Date(Date.now() + 7 * 24 * 3600000)}) 
    return res.send("Login Successfull");

  }
  catch(err){
    console.error("Error during login:", err);
    return res.status(500).send("An error occurred during login. Please try again later.");
  }
})

authRouter.post("/logout", (req, res) => {
    res.cookie({expires: new Date(Date.now())})
    res.send("Logout Successful!!")
})

module.exports = authRouter;