const md5 = require("md5");
const UserModel = require("../model/user");
const handleError = require("../utils/handleError");
const { INGRESS_SETTINGS_OPTIONS } = require("firebase-functions/v1");
const jwt = require("jsonwebtoken");


class AuthController {
    static async register(req, res) {
        const {name, email, password, address, place, country, street, long, lat, province} = req.body;

        try {
            const duplicateUser = UserModel.findOne({email: email});
            if(duplicateUser) {
                throw new Error("User already exists.");
            }

            const token = jwt.sign(email, process.env.JWT_SECRET);
            const newUser = UserModel({
                name,
                email,
                address,
                place,
                country,
                street,
                long,
                lat,
                province,
                privilage: "user",
                validToken: token,
                password: md5(password)
            });

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
                validToken: token
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

            //TODO handle this through res
            if(!user) {
                throw new Error("User not found.");
            }

            if(md5(password) != user.password){
                throw new Error("Invalid password.");
            }
            
            const token = jwt.sign(email, process.env.JWT_SECRET);
            UserModel.findOneAndUpdate({email: email}, {validToken: token});

            return res.status(200).json({
                user: {...user, password: ""},
                validToken: token
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
        const {email, token} = req.body;

        try {
            const user = await UserModel.findOne({email: email});

            if(!user) {
                throw new Error("User not found.");
            }

            if(user.validToken != token) {
                return res.status(401).json({
                    errors: ["Access denied."]
                });
            }

            await UserModel.findOneAndUpdate({email: email}, {validToken: ""});
        }
        catch(err) {
            handleError(res, [err.message], "Logout");
        }
    }

    static async deleteAccount(req, res) {
        try {
            const userToken = (await UserModel.findOne({email: email})).validToken;
            if(userToken != req.body.token) {
                return res.status(401).json({
                    errors: ["Access denied."]
                });
            }
            await UserModel.findOneAndDelete({email: req.body.email});
        }
        catch(err) {
            handleError(res, err.message, "Delete Account");
        }
    }
}

module.exports = AuthController;