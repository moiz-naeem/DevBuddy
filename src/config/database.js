const mongoose = require('mongoose')
const dotenv = require('dotenv')

dotenv.config({ path: '././.env' });



const initializeDB = async () => {

    await mongoose.connect(
        process.env.DATABASE_CLUSTER_LINK
    )
}

module.exports = initializeDB;
