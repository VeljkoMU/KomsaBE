const express = require("express");
const { mongoDBConnect } = require("./src/db/mongodb");
const constants = require("./src/utils/constants");

const http = require("http");
const app = express();
const server = http.createServer(app);
const {Server} = require("socket.io");
const io = new Server(server);

const authRounter = require("./src/router/authRouter");
const userRouter = require("./src/router/userRouter");
const newsRouter = require("./src/router/webscraperRouter");
const businessRouter = require("./src/router/businessRouter");
const placeRouter = require("./src/router/placeRouter");
const ChatController = require("./src/controller/chatController");

app.use(express.json())
mongoDBConnect(constants.MONGODB_ATLAS_CONN_STRING)

app.use("/auth", authRounter);
app.use("/user", userRouter);
app.use("/news", newsRouter);
app.use("/business", businessRouter);
app.use("/place", placeRouter);
ChatController.handleWebSocets(io);

const port = process.env.PORT || 3000;
server.listen(port, () => {
  console.log(`Server running on port ${port}`);
});

