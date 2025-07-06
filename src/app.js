const express = require("express");
const app = express();
const initializeDB = require('./config/database');
const authRouter = require('./routers/authRouter.js')
const profileRouter = require('./routers/profileRouter.js');
const requestRouter = require('./routers/requestRouter.js')
const userRouter = require('./routers/userRouter.js')
const dotenv = require('dotenv');
const cors = require('cors')


const cookieParser = require('cookie-parser') 


dotenv.config({ path: './.env' });

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
