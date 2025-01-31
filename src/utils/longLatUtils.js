const constants = require("./constants");

const generateNearbyPoints = (long, lat, km = constants.STANDARD_PROXIMITY_OFFSET_KM) => {
    const latOffset = km / constants.LAT_OFFSET_KM;
    const longOffset = km / (constants.LAT_OFFSET_KM * Math.cos(lat * (Math.PI / 180)));

    return { 
        north: lat + latOffset,
        south: lat -latOffset,
        west: long - longOffset,
        east: long + longOffset
    }
};

module.exports = {
    generateNearbyPoints
};