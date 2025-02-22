import mongoose from "mongoose";
import chatItemSchema from "./chatItem";

const chatSingleSchema = mongoose.Schema({
    userOneId: {type: String, index: true},
    userTwoId: {type: String, index: true},
    chatsItems: [chatItemSchema]
});

const ChatSingleModel = mongoose.model("ChatSingle", chatItemSchema);

module.exports = ChatSingleModel;

