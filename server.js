const express = require("express");
const { mongoDBConnect } = require("./src/db/mongodb");
const constants = require("./src/utils/constants");
const authRounter = require("./src/router/authRouter");
const app = express()

app.use(express.json())
mongoDBConnect(constants.MONGODB_ATLAS_CONN_STRING)

app.use("/user", authRounter);

app.listen(() => {
    console.log("Server started.")
}, process.env.PORT || 3000);