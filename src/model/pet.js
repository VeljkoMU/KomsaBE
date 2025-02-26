const mongoose = require("mongoose");
const mongoosePaginate = require("mongoose-paginate-v2");

const petSchema = mongoose.Schema({
    userId: String,
    name: String,
    type: String,
    subType: {type: String, required: false},
    age: Number,
    description: String,
    imageUrl: String,
    isLost: {type: Boolean, index: true},
    place: {type: String, index: true},
    lat: Number,
    long: Number
});

petSchema.plugin(mongoosePaginate);

const PetModel = mongoose.model("Pet", petSchema);

module.exports = PetModel;