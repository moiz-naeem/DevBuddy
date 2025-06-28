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
      const secondParticipant = await User.findById(requestBeingSentTo).lean();
      const reqStatus = req.params.status;

      const isValidStatus = checkValidBody(reqStatus, [
        "interested",
        "ignored",
      ]);

      if (!secondParticipant) {
        return res.status(400).send("Sending request to a non-existent user");
      }

      if (loggedInUser._id.equals(secondParticipant._id)) {
        return res.status(400).send("Sorry, can not send request to yourself!");
      }

      if (!mongoose.Types.ObjectId.isValid(requestBeingSentTo)) {
        return res.status(400).send("Invalid user ID.");
      }

      if (typeof reqStatus !== "string") {
        return res.status(400).send("Invalid status format.");
      }

      const connectionExists = await Connection.findOne({
        $or : [
          {firstParticipant: loggedInUser._id, secondParticipant: secondParticipant._id},
          {firstParticipant: secondParticipant._id, secondParticipant : loggedInUser._id},
        ]
      })
      

      if(!isObjectEmpty(connectionExists) ){
        return res.status(400).send(`Connection between ${loggedInUser.firstName} ${secondParticipant.firstName} already exists`)
      }

      const connectionRequestExists = await Request.findOne({
        $or: [
          { sendBy: loggedInUser, sentTo: requestBeingSentTo },
          { sendBy: requestBeingSentTo, sentTo: loggedInUser },
        ],
      }).lean();

      if (!isObjectEmpty(connectionRequestExists)) {
        if (
          connectionRequestExists.status === "interested" &&
          reqStatus === "interested"
        ) {
          const connection = new Connection({
            firstParticipant: loggedInUser._id,
            secondParticipant: secondParticipant._id,
            status: "accepted",
          });
          await connection.save();
          return res
            .status(200)
            .send(
              `It's a match between ${loggedInUser.firstName} ${secondParticipant.firstName} !!`
            );
        }
        return res
          .status(400)
          .send(
            `Connection request between ${loggedInUser.firstName} ${secondParticipant.firstName} of status ${connectionRequestExists.status} already exists!`
          );
      }

      const connectionRequest = new Request({
        sendBy: loggedInUser,
        sentTo: requestBeingSentTo,
        status: reqStatus,
      });
      await connectionRequest.save();

      return res.send(
        `${loggedInUser.firstName}  ${loggedInUser.lastName} sent connection request of status ${reqStatus} to ${secondParticipant.firstName}`
      );
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
