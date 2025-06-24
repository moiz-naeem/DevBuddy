const {userAuth} = require("../middlewares/Auth.js")
const express = require('express')


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

profileRouter.patch("/profile/edit/:userid", userAuth,  async (req, res) => {
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

profileRouter.patch("/profile/password", userAuth, async (req, res) => {})

module.exports = profileRouter;