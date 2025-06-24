const express = require("express");
const app = express();
const User = require('./models/User')
const initializeDB = require('./config/database');
const { default: mongoose } = require("mongoose");
const {validateSignUpData} = require('./utils/validation.js');
const bcrypt = require('bcrypt')
const validator = require('validator')
const jwt = require('jsonwebtoken')
const {userAuth} = require("./middlewares/Auth.js")
const cookieParser = require('cookie-parser') 


app.use(express.json());
app.use(cookieParser())


app.post("/signup",  async (req, res) => {
  try{
    const necessaryFields = ["firstName", "lastName", "email", "password"]
    const containNecessaryFields =  Object.keys(req.body).every(k => necessaryFields.includes(k))
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



app.post("/login", async (req, res) => {
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

app.get("/profile", userAuth, async (req, res) =>{
  try{
    const user =  req.user;
    console.log("user " + user)

    return res.send("Logged in user: " +  user.firstName + " " + user.lastName)

  }catch(err){
    return res.status(500).send("Error loading profile" + err)
  }
})

app.post("/request", userAuth, async(req, res) => {
  try{
    const user = req.user;
    res.send(user.firstName + " send a connection request")

  }catch(err){
    return res.status(500).send("Error sending connection request " + err)
  }
})

app.patch("/user/:userId", userAuth,  async(req, res) => {
  const userId = req.params.userId;
  const data = req.body;
  try{
    const updateAllowed = [ "firstName", "lastName", "password", "age", "skills", "gender"]
    const canUpdate = Object.keys(req.body).every(k => updateAllowed.includes(k))
    if(!canUpdate){
      throw new Error("Only Followinf fields can be updated: firstName, lastName, password, age, skills, gender")
    }
    if(req.body.skills.length > 10){
      throw new Error("Looks like your are highly skilled but you can only add 10 skills")
    }

    const user = await User.findByIdAndUpdate({_id: userId}, data, {returnDocument:  "after", runValidators: "true"})
    res.send(`${req.body.firstName} updated successfully`)

  }catch(error){
    res.status(400).send("Error updating " + error)
  }
})

app.get("/feed", userAuth, async (req, res) => {
  try{
      const users = await User.find({});
      if(users.length === 0){
        return res.status(404).send("We dont have user yet");
      }
      return res.send(users);
      
  }catch(err){
    res.status(400).send("Something went wrong: " + err);
  }
})

initializeDB()
  .then(() => {
  console.log("Database initialised successfully!");
  app.listen(6969, () => {
    console.log("Server listening to port 6969");
  });
})
  .catch((err) => console.log("Db connection error", err))


// app.use("/home", (req, res) => {
//     res.send("Welcome to home!")}
// );
