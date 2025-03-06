const { default: mongoose, mongo } = require("mongoose");

const businessSchema = mongoose.Schema({
    name: String,
    type: String,
    address: String,
    place: String, 
    tags: [String],
    isPartner: Boolean,
    location: {
        type: {type: String, enum: ['Point'], required: true},
        coordinates: {type: [Number], require: true}
    }
});

businessSchema.index({location: "2dsphere"});

const businessModel = mongoose.model("Business", businessSchema);

module.exports = businessModel;
