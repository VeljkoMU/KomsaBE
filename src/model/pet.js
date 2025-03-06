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
    location: {
        type: {type: String, enum: ['Point'], required: true},
        coordinates: {type: [Number], require: true}
    }
});

petSchema.index({location: "2dsphere"});

petSchema.plugin(mongoosePaginate);

const PetModel = mongoose.model("Pet", petSchema);

module.exports = PetModel;