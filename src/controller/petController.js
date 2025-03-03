const { cloudinary } = require("../db/cloudinray");
const PetModel = require("../model/pet");
const handleError = require("../utils/handleError");
const { generateNearbyPoints } = require("../utils/longLatUtils");

class PetController {
    static async getPetsByLocation(req, res) {
        const {place, long, lat, page, isLost} = req.query;
        const nearbyOffsetPoints = generateNearbyPoints(long, lat);

        try {
            const results = await PetModel.paginate({
                $or: [
                {"place": place},
                {long: {$gte: nearbyOffsetPoints.east, $lte: nearbyOffsetPoints.west},
                lat: {$gte: nearbyOffsetPoints.south, $lte: nearbyOffsetPoints.north}}
                ]
            }, {
                page: page,
                limit: 10,
            });

            if(isLost) {
                results.docs = results.docs.filter((doc) => doc.isLost);
            }

            return res.status(200).json({
                pets: results.docs,
                page: results.page,
                nextPage: results.nextPage,
                hasNextPage: results.hasNextPage
            });
        }
        catch(err) {
            handleError(res, [err], "Get Pets By Location");
        }
    }

    static async setIsLost(req, res) {
        const {petId, userId, isLost} = req.body;

        try {
            const pet = await PetModel.findById(petId);
            if(!pet) {
                return res.status(404).json({error: "Pet not found"});
            }
            if(pet.userId != userId) {
                return res.status(403).json({error: "Access unothorized"});
            }

            pet.isLost = isLost;
            const savedPet = await pet.save();

            return res.status(200).json(savedPet);
        }
        catch(err) {
            handleError(res, [err], "Set Pet Is Lost");
        }
    }

    static async addPet(req, res) {
        const {userId, name,type,subType,age,description,isLost,place,lat,long} = req.body;
        const image = req.files[0];

        try {
            const imgResponse = await cloudinary.uploader.upload(image, 
                {
                    public_id: userId + image.path,
                    folder: "pets"
                }
            );

            let results = await PetModel.create({
                userId,
                name,
                type,
                subType,
                age,
                description,
                imageUrl: imgResponse.secure_url,
                isLost,
                place,
                lat,
                long});

            return res.status(200).json(results);
        }
        catch(err) {
            handleError(res, [err], "Create Pet");
        }
    }
}

module.exports = PetController;