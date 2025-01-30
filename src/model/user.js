const { default: mongoose } = require("mongoose");

let userSchema = mongoose.Schema({
    name: String,
    email: String,
    validToken: String,
    privilage: String,
    address: {type: String, index: true},
    country: String,
    province: String,
    place: {type: String, index: true},
    street: {type: String, index: true},
    long: Number,
    lat: Number,
    password: String
});

const UserModel = mongoose.model("User", userSchema);

module.exports = UserModel;