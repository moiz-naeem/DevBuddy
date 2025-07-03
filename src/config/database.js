const moongose = require('mongoose')

const initializeDB = async () => {
    await moongose.connect(
        process.env.DATABASE_CLUSTER_LINK
    )
}

module.exports = initializeDB;
