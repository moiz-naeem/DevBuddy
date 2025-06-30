const { userAuth } = require("../middlewares/Auth.js");
const express = require("express");
const { checkValidBody, isObjectEmpty } = require("../utils/validation.js");
const Request = require("../models/Request.js");
const User = require("../models/User.js");
const Connection = require("../models/Connection.js");
const mongoose = require("mongoose");

const requestRouter = express.Router();

requestRouter.post(
  "/request/send/:status/:userId",
  userAuth,
  async (req, res) => {
    try {
      const loggedInUser = req.user;
      const requestBeingSentTo = req.params.userId;
      const reqStatus = req.params.status;

      if (!reqStatus || !requestBeingSentTo) {
          return res.status(400).send("Status or User ID is missing.");
}

      const isValidStatus = ["interested", "ignored"].includes(reqStatus);

      if(!isValidStatus){
        return res.status(400).send("Invalid request status!!")
      }
      if (!mongoose.Types.ObjectId.isValid(requestBeingSentTo)) {
        return res.status(400).send("Invalid user ID.");
      }

      const secondParticipant = await User.findById(requestBeingSentTo).lean();
      
      if (!secondParticipant) {
        return res.status(400).send("Sending request to a non-existent user");
      }

      if (loggedInUser._id.equals(secondParticipant._id)) {
        return res.status(400).send("Sorry, can not send request to yourself!");
      }


      const connectionExists = await Connection.findOne({
        $or : [
          {firstParticipant: loggedInUser._id, secondParticipant: secondParticipant._id},
          {firstParticipant: secondParticipant._id, secondParticipant : loggedInUser._id},
        ]
      })
      

      if(connectionExists){
        return res.status(400).send(`Connection between ${loggedInUser.firstName} ${secondParticipant.firstName} of status ${connectionExists.status} already exists`)
      }

      const connectionRequestExists = await Request.findOne({
        $or: [
          { sendBy: loggedInUser, sentTo: requestBeingSentTo },
          { sendBy: requestBeingSentTo, sentTo: loggedInUser },
        ],
      }).lean();

      if(!connectionRequestExists){
        return res.send(
        `${loggedInUser.firstName}  ${loggedInUser.lastName} sent connection request of status ${reqStatus} to ${secondParticipant.firstName} ${secondParticipant.lastName}`
      );
      }

      if(connectionRequestExists.sendBy === loggedInUser){
        return res.status(400).send(`You already have a pending request of status ${connectionRequestExists.status} to ${secondParticipant.firstName} ${secondParticipant.lastName}`)
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
            .send(
              `It's a match between ${loggedInUser.firstName} ${secondParticipant.firstName} !!`
            );
      }

      //connection request exists, sentBy the other user to logged in user, if other user send req of status ignored and loggedin user send req of staus interested 
      //no change should be made but if the other use sends a request of status interested and logged in user is sending request of status ignored then a new connection
      // should be made of status rejected

      if((connectionRequestExists.status === 'ignored' && reqStatus === 'interested')
          || (connectionRequestExists.status === 'interested' && reqStatus === 'ignored') )
        {
          const connection = new Connection({
            firstParticipant: secondParticipant._id,
            secondParticipant: loggedInUser._id,
            status: 'rejected'
          })
          await connection.save();
          res.send(`Unfortunately it was not a match. ${connectionRequestExists}. Therefore connection of status rejected`)
          await Request.deleteOne(connectionRequestExists)
          
        }

      
    } catch (err) {
      return res.status(400).send("Error sending connection request " + err);
    }
  }
);

requestRouter.post(
  "/request/send/ignored/:userId",
  userAuth,
  async (req, res) => {
    try {
      const user = req.user;
      res.send(user.firstName + " send a connection request");
    } catch (err) {
      return res.status(500).send("Error sending connection request " + err);
    }
  }
);

requestRouter.post(
  "/request/review/accepted/:requestId",
  userAuth,
  async (req, res) => {}
);

requestRouter.post(
  "/request/review/rejected/:requestId",
  userAuth,
  async (req, res) => {}
);

requestRouter.get("/user/connections", userAuth, async (req, res) => {});

requestRouter.get("/request/received", userAuth, async (req, res) => {});

requestRouter.get("/feed", userAuth, async (req, res) => {
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

module.exports = requestRouter;
