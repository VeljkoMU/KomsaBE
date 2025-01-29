const mongoose = require("mongoose");

const mongoDBConnect = async (conString) => {
    try {
    await mongoose.connect(conString);
    }
    catch(err) {
        console.log(err);
    }
}

const freeDBConnection = async () => {
    await mongoose.disconnect();
}

module.exports = {
    mongoDBConnect,
    freeDBConnection
}