const {v2} = require("cloudinary");
const cloudinary = v2;

function initCloudinary(name, key, secret) {
    cloudinary.config({
        cloud_name: name,
        api_key: key,
        api_secret: secret
    });
}

module.exports = {
    initCloudinary,
    cloudinary
}

