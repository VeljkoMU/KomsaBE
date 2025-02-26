const { default: mongoose, mongo } = require("mongoose");

const businessSchema = mongoose.Schema({
    name: String,
    type: String,
    address: String,
    place: String, 
    tags: [String],
    isPartner: Boolean,
    long: String,
    lat: String
});

const businessModel = mongoose.model("Business", businessSchema);

module.exports = businessModel;
