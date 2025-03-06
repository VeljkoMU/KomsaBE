const { default: mongoose } = require("mongoose");
const chatItemSchema = require("./chatItem");

const proximityChatSchema = mongoose.Schema({
    address: String,
    street: {type: String, index: true},
    city: {type: String, index: true},
    province: {type: String, index: true},
    chatItems: [chatItemSchema],
    location: {
        type: {type: String, enum: ['Point'], required: true},
        coordinates: {type: [Number], require: true}
    }
});

chatItemSchema.index({location: "2dsphere"});

const ProximityChatModel = mongoose.model("ProximityChat", proximityChatSchema);

module.exports = ProximityChatModel;