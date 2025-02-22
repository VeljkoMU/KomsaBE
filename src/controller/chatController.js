const jwt = require("jsonwebtoken");

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
            }
            catch(err) {
                socket.emit("error", {error: err});
            }
        });

        socket.on("message", (message) => {
            const token = message.split(":")[0];
            const userId = message.split(":")[1]
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
                    timestamp: Date.now()
                });
            }
            catch(err) {
                socket.emit("error", {error: err});
            }
        });
       }); 
    }

    static async getChat(req, res) {
        //Impeleted get chat by user's ID
    }

    static updateChat(req, res) {
        // Create or update chat by ID
    }
}

module.exports = ChatController;