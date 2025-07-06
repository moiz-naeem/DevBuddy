const express = require("express");
const app = express();
const User = require('./models/User')
const initializeDB = require('./config/database');
const { default: mongoose } = require("mongoose");
const authRouter = require('./routers/authRouter.js')
const profileRouter = require('./routers/profileRouter.js');
const requestRouter = require('./routers/requestRouter.js')
const userRouter = require('./routers/userRouter.js')
const dotnev = require('dotenv').config();
const cors = require('cors')




const bcrypt = require('bcrypt')
const validator = require('validator')
const jwt = require('jsonwebtoken')
const {userAuth} = require("./middlewares/Auth.js")
const cookieParser = require('cookie-parser') 
const dotenv = require('dotenv')

dotenv.config({ path: '/.env' });

app.use(cors({
  origin: process.env.BASE_URL,
  credentials: true
}))
app.use(express.json());
app.use(cookieParser())

app.use("/", authRouter )
app.use("/", profileRouter)
app.use("/", requestRouter)
app.use("/", userRouter)

initializeDB()
  .then(() => {
  console.log("Database initialised successfully!");
  app.listen(6969, () => {
    console.log("Server listening to port 6969");
  });
})
  .catch((err) => console.log("Db connection error", err))
