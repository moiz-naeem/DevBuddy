const mongoose = require('mongoose')
const dotenv = require('dotenv')

dotenv.config({ path: '././.env' });



const initializeDB = async () => {
    console.log('Mongo URI:', process.env.DATABASE_CLUSTER_LINK);

    await mongoose.connect(
        process.env.DATABASE_CLUSTER_LINK
    )
}

module.exports = initializeDB;
