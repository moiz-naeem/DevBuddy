const { userAuth } = require("../middlewares/Auth.js");
const express = require("express");
const { checkValidBody, isObjectEmpty } = require("../utils/validation.js");
const Request = require("../models/Request.js");
const User = require("../models/User.js");
const Connection = require("../models/Connection.js");
const mongoose = require("mongoose");

const requestRouter = express.Router();
//if user sends interested requests twice it become a match
requestRouter.post(
  "/request/send/:status/:userId",
  userAuth,
  async (req, res) => {
    try {
      const loggedInUser = req.user;
      const requestBeingSentTo = req.params.userId;
      const reqStatus = req.params.status;

      if (!reqStatus || !requestBeingSentTo) {
          return res.status(400).json({error: "Status or User ID is missing."});
}

      const isValidStatus = ["interested", "ignored"].includes(reqStatus);

      if(!isValidStatus){
        return res.status(400).json({error: "Invalid request status!!"})
      }
      if (!mongoose.Types.ObjectId.isValid(requestBeingSentTo)) {
        return res.status(400).json({error: "Invalid user ID."});
      }

      const secondParticipant = await User.findById(requestBeingSentTo).lean();
      
      if (!secondParticipant) {
        return res.status(400).json({error :"Sending request to a non-existent user"});
      }

      if (loggedInUser._id.equals(secondParticipant._id)) {
        return res.status(400).json({error: "Sorry, can not send request to yourself!"});
      }


      const connectionExists = await Connection.findOne({
        $or : [
          {firstParticipant: loggedInUser._id, secondParticipant: secondParticipant._id},
          {firstParticipant: secondParticipant._id, secondParticipant : loggedInUser._id},
        ]
      })
      

      if(connectionExists){
        return res.status(400).json({error: `Connection between ${loggedInUser.firstName} ${secondParticipant.firstName} of status ${connectionExists.status} already exists`})
      }

      const connectionRequestExists = await Request.findOne({
        $or: [
          { sendBy: loggedInUser, sentTo: requestBeingSentTo },
          { sendBy: requestBeingSentTo, sentTo: loggedInUser },
        ],
      }).lean();

      if(!connectionRequestExists){
        const requestConnection = new Request(
          {
            sendBy: loggedInUser._id,
            sentTo: secondParticipant._id,
            status: reqStatus
          }
        )
        await requestConnection.save();

        return res.json(
      { message: 
        `${loggedInUser.firstName}  ${loggedInUser.lastName} sent connection request of status ${reqStatus} to ${secondParticipant.firstName} ${secondParticipant.lastName}`
      });
      }

      if(connectionRequestExists.sendBy.equals(loggedInUser._id)){
        return res.status(400).json({error: `You already have a pending request of status ${connectionRequestExists.status} to ${secondParticipant.firstName} ${secondParticipant.lastName}`})
      }

      if(connectionRequestExists.status === "interested" &&
          reqStatus === "interested"){
          const connection = new Connection({
            firstParticipant: loggedInUser._id,
            secondParticipant: secondParticipant._id,
            status: "accepted",
          });
          await connection.save();
          await Request.deleteOne({
            sendBy: secondParticipant._id,
            sendTo: loggedInUser._id
          })

          return res
            .status(200)
            .json({
              message: `It's a match between ${loggedInUser.firstName} ${secondParticipant.firstName} !!`
          });
      }

      //connection request exists, sentBy the other user to logged in user, if other user send req of status ignored and loggedin user send req of staus interested 
      //no change should be made but if the other use sends a request of status interested and logged in user is sending request of status ignored then a new connection
      // should be made of status rejected
      
      const connection = new Connection({
          firstParticipant: secondParticipant._id,
          secondParticipant: loggedInUser._id,
          status: 'rejected'
          })
        await connection.save();
        await Request.deleteOne(connectionRequestExists)

        res.json({message: `Unfortunately it was not a match. ${connectionRequestExists}. Therefore connection of status rejected`})
          
      

      
    } catch (err) {
      return res.status(400).json({error: "Error sending connection request " + err});
    }
  }
);

requestRouter.post(
  "/request/review/:status/:requestId",
  userAuth,
  async (req, res) => {
    try {
      const { status, requestId } = req.params;
      const isValidStatus = ["accepted", "rejected"].includes(status);
      const loggedInUser = req.user;

      if(!status || !requestId){
        return res.status(400).json({error: " Status or Request id missing!!"})
      }

      if (!isValidStatus) {
        return res.status(400).json({error: "Invalid request status"});
      }
      if (!mongoose.Types.ObjectId.isValid(requestId)) {
        return res.status(400).json({error: "Invalid req id!"});
      }
      const requestExist = await Request.findOne({_id : requestId, sentTo: loggedInUser._id, status: 'interested'});

      if(!requestExist){
        return res.status(404).json({error: "No record found against request id with status interested"})
      }

      if(status === 'accepted'){
        const connection = new Connection({
          firstParticipant: loggedInUser._id,
          secondParticipant : requestExist.sendBy,
          status : 'accepted'

        })
        await connection.save();
        await Request.deleteOne(requestExist);
        return res.status(200).json({message: `${loggedInUser.firstName} ${loggedInUser.lastName} accepted ${requestExist.sendBy} 's request`})
      }

      const connection = new Connection({
          firstParticipant: loggedInUser._id,
          secondParticipant : requestExist.sendBy,
          status : 'rejected'

        })
      await connection.save();
      await Request.deleteOne(requestExist);
      res.status(200).json({message: `${loggedInUser.firstName} ${loggedInUser.lastName} rejected ${requestExist.sendBy} 's request`})


    } catch (err) {
      return res.status(400).json({error: "Error reviewing the request: " + err});
    }
  }
);



module.exports = requestRouter;
