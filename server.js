const express = require("express");
const { mongoDBConnect } = require("./src/db/mongodb");
const constants = require("./src/utils/constants");
const authRouter = require("./src/router/authRouter");
const userRouter = require("./src/router/userRouter");
const businessRouter = require("./src/router/businessRouter");

const app = express();

app.use(express.json());
mongoDBConnect(constants.MONGODB_ATLAS_CONN_STRING);

app.use("/auth", authRouter);
app.use("/user", userRouter);
app.use("/business", businessRouter);

app.listen(process.env.PORT || 3000, () => {
  console.log(`Server started on port ${PORT}.`);
});
