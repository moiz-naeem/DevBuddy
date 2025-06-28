const {userAuth} = require("../middlewares/Auth.js")
const express = require('express')
const {profileEditSanitization} = require('../utils/validation.js')
const User = require('../models/User')
const {checkValidBody} = require('../utils/validation.js')
const bcrypt = require("bcrypt")
const validator = require('validator');



const profileRouter = express.Router();

profileRouter.get("/profile/view", userAuth, async (req, res) =>{
  try{
    const user =  req.user;
    console.log("user " + user)

    return res.send("Logged in user: " +  user.firstName + " " + user.lastName)

  }catch(err){
    return res.status(500).send("Error loading profile" + err)
  }
})

profileRouter.patch("/profile/edit/", userAuth, async (req, res) => {
  const fieldsSentByUser = req.body;
  try {
    const canUpdate = checkValidBody(req.body, ["firstName", "lastName", "age", "skills", "gender"]) 
    if (!canUpdate) {
      throw new Error(
        "Only Following fields can be updated: firstName, lastName, age, skills, gender"
      );
    }
    const loggedInUser = req.user;
    console.log("Logged in :" + loggedInUser);
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
    res.send(`${req.body.firstName} updated successfully`);
  } catch (error) {
    res.status(400).send("Error updating " + error);
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
      return res.status(400).send(
        "Only current and new password should be included in the body"
      );
    }
    const isValidPassword = await req.user.verifyPassword(req.body.currentPassword)
    if (!isValidPassword) {
      return res.status(400).send("Current password is not correct");
    }
    if(!validator.isStrongPassword(req.body.newPassword)){
        return res.status(400).send("Your new password is not strong enough!")
    }
    const hashedPassword = await bcrypt.hash(req.body.newPassword, 10)
    const updated = await User.findByIdAndUpdate(
      { _id: loggedInUser._id },
      { password: hashedPassword },
      { returnDocument: "after", runValidators: "true" }
    );
    res.send("Password changed successfully!");
  } catch (err) {
    res.status(500).send("Password change unsuccessful" + err);
  }

});

module.exports = profileRouter;
