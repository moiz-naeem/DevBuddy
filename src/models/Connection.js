const mongoose = require('mongoose');
const validator = require('validator');


const connectionSchema = mongoose.Schema(
    {
        firstParticipant:{
            type: mongoose.Types.ObjectId,
            required: [true, "Who sent the request? Can not find the sender"],
        },
        secondParticipant:{
            type: mongoose.Types.ObjectId,
            required: [true, "Whom are you sending request to? Can not find data in request."]
        },
        status:{
            type: String,
            required: [true, "What kind of request are you sending? Can't find the status."],
            enum: ['accepted', 'blocked']
        }

    }, {timestamps: true}


)

connectionSchema.index({'createdAt': -1});

module.exports = mongoose.model("Connection", connectionSchema)