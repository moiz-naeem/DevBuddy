const {validateSignUpData, checkValidBody} = require('../utils/validation.js');
const User = require('../models/User')
const bcrypt = require('bcrypt')
const validator = require('validator')
const {userAuth} = require('../middlewares/Auth.js')
const loginLimiter = require('../utils/validation.js')


const express = require('express')


const authRouter = express.Router();

//check if there is any active session before signing up new user
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
    return res.json({message : `${user.firstName} added successfully!`})
  }catch(error){
    return res.status(400).json({message: "User registration unsuccessful " + error});
  }
  
})


//if someone is already logged in check if it is the same user as the one loggin in if true then tell them you are already logged in
authRouter.post("/login",  async (req, res) => {
  try{
    const{email, password} = req.body;

    
    if (req.cookies.authToken) {
      
      res.cookie("authToken", "", {
        expires: new Date(0), 
        httpOnly: true,
        secure: true, 
        sameSite: "strict",
      });
      return res
        .status(400)
        .json({message: "A session was already active. The user has been logged out. Please try logging in again."});
    }

    if(!validator.isEmail(email) || !password || (password.trim().length === 0) ){
      return res.status(400).json({error: "Invalid input. Please provide a valid email and password."})
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
    res.cookie("authToken", token, {
      httpOnly: true,
      sameSite: "strict",
      expires: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000),
    });
    return res.send("Login Successfull");

  }
  catch(err){
    console.error("Error during login:", err);
    return res.status(500).send("An error occurred during login. Please try again later.");
  }
})

authRouter.post("/logout", userAuth, (req, res) => {
    res.cookie('authToken', '', { 
        expires: new Date(), 
        httpOnly: true,    
        secure: true,   
        sameSite: 'strict'  
    });

    res.status(200).send("Logout Successful!!");
});


module.exports = authRouter;