const {userAuth} = require("../middlewares/Auth.js")
const express = require('express')


const requestRouter = express.Router();


requestRouter.post("/request/send/interested/:userId", userAuth, async (req, res) => {
  try{
    const user = req.user;
    res.send(user.firstName + " send a connection request")

  }catch(err){
    return res.status(500).send("Error sending connection request " + err)
  }
})

requestRouter.post("/request/send/ignored/:userId", userAuth, async (req, res) => {
  try{
    const user = req.user;
    res.send(user.firstName + " send a connection request")

  }catch(err){
    return res.status(500).send("Error sending connection request " + err)
  }
})

requestRouter.post("/request/review/accepted/:requestId", userAuth, async (req, res) => {})

requestRouter.post("/request/review/rejected/:requestId", userAuth, async (req, res) => {})

requestRouter.get("/user/connections", userAuth, async (req, res) => {})

requestRouter.get("/request/received", userAuth, async (req, res) => {})

requestRouter.get("/feed", userAuth, async (req, res) => {
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

module.exports = requestRouter;