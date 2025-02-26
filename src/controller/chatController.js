const jwt = require("jsonwebtoken");
const ChatSingleModel = require("../model/chatSingle");
class ChatController {
  static rooms = new Map();

  static async handleWebSocets(io) {
    io.on("connection", (socket) => {
      socket.on("join-room", (data) => {
        const token = data.split(":")[0];
        const userId = data.split(":")[1];
        const room = data.split(":")[2];
        try {
          jwt.verify(token, env.PROCCESS.JWT_SECERT);
          //TODO Check chat credentials
          socket.join(room);
        } catch (err) {
          socket.emit("error", { error: err });
        }
      });

      socket.on("message", (message) => {
        const token = message.split(":")[0];
        const userId = message.split(":")[1];
        const room = message.split(":")[2];
        const msg = message.split(":")[3];
        const chatType = message.split(":")[4];

        try {
          jwt.verify(token, env.PROCCESS.JWT_SECERT);
          //TODO save message to Chat
          //TODO Check chat credentials
          io.to(room).emit("receive", {
            senderId: userId,
            senderName: "", // To be added
            content: msg,
            timestamp: Date.now(),
          });
        } catch (err) {
          socket.emit("error", { error: err });
        }
      });
    });
  }

  static async getChat(req, res) {
    const { chatId } = req.params;

    try {
      const chat = await ChatSingleModel.findOne({ chatId });

      if (!chat) {
        return res.status(404).json({ error: "Chat not found" });
      }

      return res.status(200).json(chat.chatsItems);
    } catch (err) {
      return res
        .status(500)
        .json({ error: "Error fetching chat data", details: err.message });
    }
  }

  static async updateChat(req, res) {
    const { id, userIds, chatItems } = req.body;

    try {
      let chat = await ChatGroupModel.findOne({ id });

      if (chat) {
        chat.chatItems.push(...chatItems);
        await chat.save();
        return res.status(200).json({ message: "Chat updated", chat });
      } else {
        chat = new ChatGroupModel({ id, userIds, chatItems });
        await chat.save();
        return res.status(201).json({ message: "Chat created", chat });
      }
    } catch (err) {
      return res
        .status(500)
        .json({ error: "Error updating chat", details: err.message });
    }
  }
}

module.exports = ChatController;
