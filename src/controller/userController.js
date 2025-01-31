const UserModel = require("../model/user");
const handleError = require("../utils/handleError");
const { generateNearbyPoints } = require("../utils/longLatUtils");

class UserController {
    static async getUserByEmail(req, res) {
        const {email} = req.query;

        try {
            const user = await UserModel.findOne({email: email});

            return res.status(200).json({
                user: user
            });
        }
        catch(err) {
            handleError(res, [err.message], "Get User By Email");
        }
    }

    static async getUserByAddress(req, res) {
        const {address} = req.query;

        try {
            const user = await UserModel.findOne({address: address});

            return res.status(200).json({
                user: user
            });
        }
        catch(err) {
            handleError(res, [err.message], "Get User By Email");
        }
    }

    static async findUsersByLocation(req, res) {
        const {long, lat, address} = req.query;
        const nearbyOffsetPoints = generateNearbyPoints(long, lat);
        
        try {
            const usersByAddress = await UserModel.find({address: address});
            const usersByProximity = await UserModel.find({
                long: {$gte: nearbyOffsetPoints.east, $lte: nearbyOffsetPoints.west},
                lat: {$gte: nearbyOffsetPoints.south, $lte: nearbyOffsetPoints.north}
            });

            const users = [...new Set(usersByAddress.concat(usersByProximity))];

            return res.status(200).json({
                users: users
            });
        }
        catch(err) {
            handleError(res, [err.message], "Find User By Proximity")
        }
    }

    static async updateUser(req, res) {
        const {name, email, address, place, country, street, long, lat, province, token} = req.body;

        try {
            const user = await UserModel.findOne({email: email});

            if(!user) {
                return res.status(404).json({
                    errors: ["User not found."]
                });
            }

            if(user.validToken != token) {
                return res.status(401).json({
                    errors: ["Access denied."]
                });
            }

            await UserModel.findOneAndUpdate({email: email}, {
                name: name ?? user.name,
                address: address ?? user.address,
                place: place ?? user.place,
                country: country ?? user.country,
                street: street ?? user.street,
                long: long ?? user.long,
                lat: lat ?? user.lat,
                province: province ?? user.province
            });

            return res.status(200);
        }   
        catch(err) {
            handleError(res, err.message, "UpdateUser.");
        }
    }
};

module.exports = UserController;