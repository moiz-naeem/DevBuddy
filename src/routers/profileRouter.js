const {userAuth} = require("../middlewares/Auth.js")
const express = require('express')
const {profileEditSanitization} = require('../utils/validation.js')
const User = require('../models/User')
const {checkValidBody} = require('../utils/validation.js')
const bcrypt = require("bcrypt")
const validator = require('validator');



const profileRouter = express.Router();

profileRouter.use((req, res, next) => {
  console.log(`${new Date().toISOString()} - ${req.method} ${req.path}`);
  console.log('Headers:', req.headers);
  console.log('Body:', req.body);
  next();
});

profileRouter.get("/profile/view", userAuth, async (req, res) =>{
  try{
    const user =  req.user;
    console.log("user " + user)

    return res.json({data: {firstName: user.firstName, lastName: user.lastName, about: user.about, age: user.age},
                     caseSensitiveData: {skills: user.skills, photourl: user.photourl, email:user.email} })

  }catch(err){
    return res.status(400).json({error: "Error loading profile" + err})
  }
})

profileRouter.patch("/profile/edit", userAuth, async (req, res) => {
  const fieldsSentByUser = req.body;
  console.log(fieldsSentByUser)
  try {
    const canUpdate = checkValidBody(req.body, ["firstName", "lastName", "age", "skills", "gender", "about", "photourl"]) 
    if (!canUpdate) {
      throw new Error(
        "Only Following fields can be updated: firstName, lastName, age, skills, gender"
      );
    }
    const loggedInUser = req.user;
    if (
      "skills" in fieldsSentByUser &&
      Array.isArray(fieldsSentByUser.skills) &&
      fieldsSentByUser.skills.length > 10
    ) {
      throw new Error(
        "Looks like your are highly skilled but you can only add 10 skills"
      );
    }

    const user = await User.findByIdAndUpdate(
      { _id: loggedInUser._id },
      fieldsSentByUser,
      { returnDocument: "after", runValidators: "true" }
    );
    return res.json({message: `Profile updated successfully`, status: "pass"});
  } catch (error) {
    res.status(400).json({message: error.message, status:"fail"});
  }
});

profileRouter.patch("/profile/password", userAuth, async (req, res) => {
  try {
    const loggedInUser = req.user;
    const isValidBody = checkValidBody(req.body, [
      "currentPassword",
      "newPassword",
    ]);
    if (!isValidBody) {
      return res.status(400).json({
        message: "Only current and new password should be included in the body",
        status: "fail"
    });
    }
    const isValidPassword = await req.user.verifyPassword(req.body.currentPassword)
    if (!isValidPassword) {
      return res.status(400).json({message: "Current password is not correct" ,
        status: "fail"});
    }
    if(!validator.isStrongPassword(req.body.newPassword)){
        return res.status(400).json({message: "Your new password is not strong enough!",
        status: "fail"})
    }
    const hashedPassword = await bcrypt.hash(req.body.newPassword, 10)
    await User.findByIdAndUpdate(
      { _id: loggedInUser._id },
      { password: hashedPassword },
      { returnDocument: "after", runValidators: "true" }
    );
    return res.json({message: "Password changed successfully!", status:"pass"});
  } catch (err) {
    res.status(400).json({message: "Password change unsuccessful" + err, status: "fail"});
  }

});

module.exports = profileRouter;
