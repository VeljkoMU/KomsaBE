const express = require("express");
const { mongoDBConnect } = require("./src/db/mongodb");
const constants = require("./src/utils/constants");
const app = express();
const authRounter = require("./src/router/authRouter");
const userRouter = require("./src/router/userRouter");
const businessRouter = require("./src/router/businessRouter");
const placeRouter = require("./src/router/placeRouter");

app.use(express.json());
mongoDBConnect(constants.MONGODB_ATLAS_CONN_STRING);

app.use("/auth", authRounter);
app.use("/user", userRouter);
app.use("/business", businessRouter);
app.use("/place", placeRouter);

app.listen(() => {
  console.log("Server started.");
}, process.env.PORT || 3000);
