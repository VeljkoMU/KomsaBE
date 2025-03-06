const { default: mongoose } = require("mongoose");

let userSchema = mongoose.Schema({
    name: String,
    email: {type: String, unique: true},
    validToken: String,
    privilage: String,
    address: {type: String, index: true},
    country: String,
    province: String,
    place: {type: String, index: true},
    street: {type: String, index: true},
    password: String,
    location: {
        type: {type: String, enum: ['Point'], required: true},
        coordinates: {type: [Number], require: true}
    }
});

userSchema.index({location: "2dsphere"});

const UserModel = mongoose.model("User", userSchema);

module.exports = UserModel;