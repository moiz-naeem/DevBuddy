const moongose = require('mongoose')

const initializeDB = async () => {
    await moongose.connect(
        "mongodb+srv://moiznaeem20:devBuddy@noding.w2p33do.mongodb.net/devBuddy"
    )
}

module.exports = initializeDB;
