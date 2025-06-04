const express = require('express');
const app = express();

app.listen(6969, () => {console.log("Server listening to port 6969")})

app.use("/", (req, res) => {
    res.send("Welcome to DevBuddy")
});