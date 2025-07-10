const jwt = require("jsonwebtoken");
const User = require("../models/User");

const dotenv = require('dotenv')

dotenv.config({ path: '././.env' });

console.log("JWT_SECRET loaded:", !!process.env.JWT_SECRET);

const userAuth = async (req, res, next) => {
  try {
    const cookie = req.cookies;
    const { authToken } = cookie;
    if (authToken === undefined) {
      return res.status(400).json({message: "Error: No valid session found"});
    }
    const { _id } =  jwt.verify(authToken, process.env.JWT_SECRET);
    const user = await User.findById(_id);
    if(!user){
        return res.status(400).json({message: "Error: No valid session found"})
    }
    req.user = user;
    console.log(user);
    next();
  } catch (err) {
    return res.status(500).send("Error durinf user authentication" + err);
  }
};

module.exports = { userAuth };
