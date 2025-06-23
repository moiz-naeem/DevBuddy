const jwt = require("jsonwebtoken");
const User = require("../models/User");

const userAuth = async (req, res, next) => {
  try {
    const cookie = req.cookies;
    const { token } = cookie;
    if (token === undefined) {
      return res.status(400).send("No valid JWt token found");
    }
    const { _id } = await jwt.verify(token, "deVbuDdy!2@");
    const user = await User.findById(_id);
    if(!user){
        return res.status(400).send("Invalid JWT token")
    }
    req.user = user;
    console.log(user);
    next();
  } catch (err) {
    return res.status(500).send("Error durinf user authentication" + err);
  }
};

module.exports = { userAuth };
