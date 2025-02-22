const { default: mongoose, mongo } = require("mongoose");
const chatItemSchema = require("./chatItem");

const chatGroupSchema = mongoose.Schema({
    userIds: [String],
    chatItems: [chatItemSchema]
});

const ChatGroupModel = mongoose.model("ChatGroup", chatGroupSchema);

module.exports = ChatGroupModel;