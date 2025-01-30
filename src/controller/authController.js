const md5 = require("md5");
const UserModel = require("../model/user");
const handleError = require("../utils/handleError");
const { INGRESS_SETTINGS_OPTIONS } = require("firebase-functions/v1");


class AuthController {
    static async register(req, res) {
        const {name, password, address, place, country, street, long, lat, province} = req.body;

        try {
            const duplicateUser = UserModel.findOne({email: email});
            if(duplicateUser) {
                throw new Error("User already exists.");
            }

            const newUser = UserModel({
                name,
                address,
                place,
                country,
                street,
                long,
                lat,
                province,
                privilage: "user",
                validToken: "",
                password: md5(password)
            });

            //Generate token

            await newUser.save();
            return res.status(200).json({
                user: {
                name,
                address,
                place,
                country,
                street,
                long,
                lat,
                province
                },
                validToken
            });
        }
        catch(err) {
            handleError(res, err.message, "Register");
        }
    } 

    static async login(req, res) {
        const {email, password} = req.body;

        try {
            const user = await UserModel.findOne({email: email});

            if(!user) {
                throw new Error("User not found.");
            }

            if(md5(password) != user.password){
                throw new Error("Invalid password.");
            }
            
            //Generate token

            return res.status(200).json({
                user: {...user, password: ""},
                validToken: ""
            });
        }
        catch(err) {
            handleError(res, err.message, "Login");
        }
    }

    static async googleLogin(req, res) {
        //TODO
    }

    static async logout(req, res) {
        //TODO
    }

    static async deleteAccount(req, res) {
        //Invalidate token

        try {
            await UserModel.findOneAndDelete({email: req.body.email});
        }
        catch(err) {
            handleError(res, err.message, "Delete Account");
        }
    }
}

module.exports = AuthController;