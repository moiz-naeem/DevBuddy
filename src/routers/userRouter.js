const express = require('express');
const userRouter = express.Router();
const Request = require('../models/Request')
const Connection = require('../models/Connection')
const User = require('../models/User')
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
        }).populate("firstParticipant", safeToSendUserData).populate("secondParticipant", safeToSendUserData)

        const data = connections.map(row => {
            if( (row.firstParticipant._id).equals(loggedInUser._id) ){
                return row.secondParticipant;
            }
            return row.firstParticipant;
        }
        )

        return res.json({
            data: data
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
            return res.status(200).json({
                message: "You have no active requests",
                data: requestsReceived
            })
        }
        return res.json({
            message: "Success",
            data: requestsReceived
        })

    }
    catch(err){
        return res.status(400).json({error: err.message})
    }
  
});

userRouter.get("/feed", userAuth, async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1;
    let limit = parseInt(req.query.limit) || 10
    limit = limit > 50 ? 50 : limit;
    const loggedInUser = req.user;

    const existingConnections =  await Connection.find({
        $or: [
            {firstParticipant: loggedInUser._id},
            {secondParticipant: loggedInUser._id}
        ]
  });

    const anotherUserInConnection = existingConnections.map(connection => {
        if(connection.firstParticipant._id.equals(loggedInUser._id)){
            return connection.secondParticipant.toString()
        }
        return connection.firstParticipant.toString()
   })
    const totalRequests = await Request.find({sendBy: loggedInUser._id})
    const requestsAlreadySent = totalRequests.map(request => {
        return request.sentTo.toString()
    })

    console.log(anotherUserInConnection)
    console.log(requestsAlreadySent)

    const blockedUsers = [...anotherUserInConnection, ...requestsAlreadySent, loggedInUser._id.toString()];

    const shouldNotBeInFeed = await User.find({_id : {$in: blockedUsers}})

    const userForFeed = await User.find({
        _id : {$nin: blockedUsers}
    }).skip((page-1)*10).limit(limit)

    res.json({length:userForFeed.length, users: userForFeed, blocked: shouldNotBeInFeed});
    

  } catch (err) {
    res.status(400).json({error: err.message});
  }
});


module.exports = userRouter;