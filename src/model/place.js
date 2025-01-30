const { default: mongoose } = require("mongoose");

const placeSchema = mongoose.Schema({
    name: String,
    county: String,
    street: String,
    province: String,
    long: Number,
    lat: Number,
    users: [String],
    addresses: [String]
});

const placeModel = mongoose.model("Place", placeSchema);

module.exports = placeModel;