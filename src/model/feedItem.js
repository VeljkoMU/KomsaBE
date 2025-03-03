const mongoose = require("mongoose");
const mongoosePaginate = require("mongoose-paginate-v2");

const feedItemSchema = mongoose.Schema({
    userId: String,
    text: String,
    userName: String,
    imageUrls: [String],
    timestamp: Number,
    place: {type: String, index: true},
    lat: Number,
    long: Number
});

feedItemSchema.plugin(mongoosePaginate);

const FeedItemModel = mongoose.model("FeedItem", feedItemSchema);

module.exports = FeedItemModel;