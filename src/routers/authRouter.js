const {validateSignUpData, checkValidBody} = require('../utils/validation.js');
const User = require('../models/User')
const bcrypt = require('bcrypt')
const validator = require('validator')
const {userAuth} = require('../middlewares/Auth.js')
const Redis = require('redis')
const dotenv = require('dotenv')

dotenv.config({ path: '././.env' }); 



const express = require('express')


const authRouter = express.Router();

// const redisClient = Redis.createClient({
//   username: process.env.REDIS_USERNAME,
//   password: process.env.REDIS_PASSWORD,
//   socket: {
//         host: process.env.REDIS_HOST,
//         port: process.env.REDIS_PORT
//     }
// });

// redisClient.on('error', (err) => {
//   console.error('Redis Client Error:', err);
// });


// redisClient.connect();

const createRateLimit = (windowMs, maxAttempts, keyPrefix) => {
  return async (req, res, next) => {
    try {
      const identifier = req.ip || req.connection.remoteAddress;
      const key = `${keyPrefix}:${identifier}`;
      
      const current = await redisClient.get(key);
      
      if (current === null) {
        await redisClient.setEx(key, Math.ceil(windowMs / 1000), '1');
        return next();
      } else if (parseInt(current) < maxAttempts) {
        await redisClient.incr(key);
        return next();
      } else {
        const ttl = await redisClient.ttl(key);
        return res.status(429).json({
          error: "Too many login attempts. Please try again later.",
          retryAfter: ttl > 0 ? ttl : Math.ceil(windowMs / 1000)
        });
      }
    } catch (error) {
      console.error('Rate limiter error:', error);
      return next();
    }
  };
};

const checkAccountLockout = async (email) => {
  const lockoutKey = `lockout:${email}`;
  const attempts = await redisClient.get(lockoutKey);
  
  if (attempts && parseInt(attempts) >= 5) {
    const ttl = await redisClient.ttl(lockoutKey);
    return {
      locked: true,
      retryAfter: ttl > 0 ? ttl : 300 
    };
  }
  
  return { locked: false };
};

const recordFailedAttempt = async (email) => {
  const lockoutKey = `lockout:${email}`;
  const current = await redisClient.get(lockoutKey);
  
  if (current === null) {
    await redisClient.setEx(lockoutKey, 300, 1);
  } else {
    await redisClient.incr(lockoutKey);
  }
};

const clearFailedAttempts = async (email) => {
  const lockoutKey = `lockout:${email}`;
  await redisClient.del(lockoutKey);
};


const loginRateLimit = createRateLimit(5 * 60 * 1000, 10, 'login_attempts');


//check if there is any active session before signing up new user
authRouter.post("/signup",  async (req, res) => {
  try{
    if (req.cookies.authToken) {
      
      res.cookie("authToken", "", {
        expires: new Date(0), 
        httpOnly: true,
        sameSite: "strict",
      });
      return res
        .status(400)
        .json({message: "You can not sign up while already logged in. A session was already active. The user has been logged out. Please try logging in again.", status: "fail"});
    }
    const containNecessaryFields =  checkValidBody(req.body, ["firstName", "lastName", "email", "password"]) 
    if(!containNecessaryFields){
      return res.status(400).json({message: "We only need firstName, lastName, email and password ", status: "fail"});
    }
    const{firstName, lastName, email, password} = req.body;
    validateSignUpData(req)
    const userExists = await User.find({email});
    if(userExists){
      return res.status(400).json({message: "The email is already registered.", status: "fail"});

    }
    const hashedPassword = await bcrypt.hash(password, 10)
    const user =  new User({
      firstName,
      lastName,
      email,
      password:hashedPassword
    });

    await user.save();
    return res.json({message : `Registered successfully!`, status: "pass"})
  }catch(error){
    return res.status(400).json({message: "User registration unsuccessful ", status: "fail"});
  }
  
})


//if someone is already logged in check if it is the same user as the one loggin in if true then tell them you are already logged in
// authRouter.post("/login", loginRateLimit,  async (req, res) => {

authRouter.post("/login",  async (req, res) => {
  try{
    const{email, password} = req.body;

    
    if (req.cookies.authToken) {
      
      res.cookie("authToken", "", {
        expires: new Date(0), 
        httpOnly: true,
        sameSite: "strict",
      });
      return res
        .status(400)
        .json({message: "A session was already active. The user has been logged out. Please try logging in again."});
    }

    if(!validator.isEmail(email) || !password || (password.trim().length === 0) ){
      return res.status(400).json({error: "Invalid input. Please provide a valid email and password."})
    }

    // const lockoutStatus = await checkAccountLockout(email);
    // if (lockoutStatus.locked) {
    //   return res.status(423).json({
    //     error: "Account temporarily locked due to too many failed attempts. Please try again later.",
    //     retryAfter: lockoutStatus.retryAfter
    //   });
    // }
    
    const user =  await User.findOne({email : email});
    if(!user){
      return res.status(401).send("Invalid Credentials")
    }
    const isValid = await user.verifyPassword(password);

    if(!isValid){
      return res.status(401).send("Invalid Credentials")

    }

    // await clearFailedAttempts(email);

    const token = await user.getJWT();
    res.cookie("authToken", token, {
      httpOnly: true,
      secure: false, 
      sameSite: "lax", 
      expires: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000),
      domain: "localhost", 
    });
    // res.cookie("authToken", token, {
    //   httpOnly: true,
    //   sameSite: "strict",
    //   expires: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000),
    // });
    return res.json({ 
      message: "Login successful",
      data: user
    })

  }
  catch(err){
    console.error("Error during login:", err);
    return res.status(500).send("An error occurred during login. Please try again later.");
  }
})

authRouter.post("/logout", userAuth, (req, res) => {
    res.cookie('authToken', '', { 
        expires: new Date(), 
        httpOnly: true,    
        sameSite: 'lax' //'strict'  
    });

    res.status(200).json({message: "Logout Successful!!"});
});


module.exports = authRouter;