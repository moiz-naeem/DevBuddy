const express = require("express");
const app = express();
const initializeDB = require('./config/database');
const authRouter = require('./routers/authRouter.js')
const profileRouter = require('./routers/profileRouter.js');
const requestRouter = require('./routers/requestRouter.js')
const userRouter = require('./routers/userRouter.js')
const dotenv = require('dotenv');
const cors = require('cors')


app.use(cors({
  origin: ["http://localhost:5173", "http://127.0.0.1:5173"],
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization', 'Cookie'],
  exposedHeaders: ['Set-Cookie']
}));

dotenv.config({ path: '../.env' });
const cookieParser = require('cookie-parser')

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
