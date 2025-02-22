const { default: mongoose } = require("mongoose");

const chatItemSchema = mongoose.Schema({
    content: String,
    senderName: String,
    senderId: {type: String, index: true},
    receiverId: {type: String, index: true},
    timestamp: {type: Number, index: true}
});

const ChatItemModel = mongoose.model("ChatItem", chatItemSchema);

module.exports = chatItemSchema;