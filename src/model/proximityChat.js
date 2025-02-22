const { default: mongoose } = require("mongoose");
const chatItemSchema = require("./chatItem");

const proximityChatSchema = mongoose.Schema({
    address: String,
    street: {type: String, index: true},
    city: {type: String, index: true},
    province: {type: String, index: true},
    lat: Number,
    long: Number,
    chatItems: [chatItemSchema]
});

const ProximityChatModel = mongoose.model("ProximityChat", proximityChatSchema);

module.exports = ProximityChatModel;