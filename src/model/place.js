const { default: mongoose } = require("mongoose");

const placeSchema = mongoose.Schema({
    name: String,
    county: String,
    street: String,
    province: String,
    users: [String],
    addresses: [String],
    location: {
        type: {type: String, enum: ['Point'], required: true},
        coordinates: {type: [Number], require: true}
    }
});

placeSchema.index({location: "2dsphere"});

const placeModel = mongoose.model("Place", placeSchema);

module.exports = placeModel;