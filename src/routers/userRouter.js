const express = require('express');
const userRouter = express.Router();
const Request = require('../models/Request')
const Connection = require('../models/Connection')
const {userAuth} = require('../middlewares/Auth')

const safeToSendUserData = "firstName lastName age about skills gender photourl";

userRouter.get("/user/connections", userAuth, async (req, res) => {
    try{
        const loggedInUser = req.user;

        const connections = await Connection.find({
            $or : [
                {firstParticipant: loggedInUser._id, status : 'accepted'},
                {secondParticipant: loggedInUser._id, status : 'accepted' }
            ]
        }).populate(firstParticipant, safeToSendUserData).populate(secondParticipant, safeToSendUserData)

        return res.json({
            data: connections
        })

    }catch(err){
        return res.status(400).json({
            error: err.message
        })
    }
});

userRouter.get("/user/request/received", userAuth, async (req, res) => {
    try{
        const loggedInUser = req.user;

        const requestsReceived = await Request.find(
            {
                sentTo: loggedInUser,
                status: "interested"
            }
        ).populate("sendBy", safeToSendUserData )

        if(requestsReceived.length === 0 ){
            return res.status(404).json({
                message: "You have no active requests",
                requests: requestsReceived
            })
        }
        return res.json({
            data: requestsReceived
        })

    }
    catch(err){
        return res.status(400).json({error: err.message})
    }
  
});

userRouter.get("/feed", userAuth, async (req, res) => {
  try {
    const users = await User.find({});
    if (users.length === 0) {
      return res.status(404).send("We dont have user yet");
    }
    return res.send(users);
  } catch (err) {
    res.status(400).send("Something went wrong: " + err);
  }
});


module.exports = userRouter;