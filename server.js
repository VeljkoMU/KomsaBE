const express = require("express");
const { mongoDBConnect } = require("./src/db/mongodb");
const constants = require("./src/utils/constants");
const app = express()
const authRounter = require("./src/router/authRouter");
const userRouter = require("./src/router/userRouter");

app.use(express.json())
mongoDBConnect(constants.MONGODB_ATLAS_CONN_STRING)

app.use("/auth", authRounter);
app.use("/user", userRouter);

app.listen(() => {
    console.log("Server started.")
}, process.env.PORT || 3000);