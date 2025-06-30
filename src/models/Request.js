const mongoose = require('mongoose');
const validator = require('validator');


const requestSchema = mongoose.Schema(
    {
        sendBy:{
            type: mongoose.Types.ObjectId,
            ref: "User",
            required: [true, "Who sent the request? Can not find the sender"],
        },
        sentTo:{
            type: mongoose.Types.ObjectId,
            ref: "User",
            required: [true, "Whom are you sending request to? Can not find data in request."]
        },
        status:{
            type: String,
            required: [true, "What kind of request are you sending? Can't find the status."]
        }

    }, {timestamp: true}


)
requestSchema.index({'createdAt': -1})

module.exports = mongoose.model("Request", requestSchema)