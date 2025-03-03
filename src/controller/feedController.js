const { cloudinary } = require("../db/cloudinray");
const FeedItemModel = require("../model/feedItem");
const UserModel = require("../model/user");
const handleError = require("../utils/handleError");
const { generateNearbyPoints } = require("../utils/longLatUtils");

class FeedController {
    static async getFeed(req, res) {
        const {place, page, lat, long} = req.query;
        const  nearbyOffsetPoints = generateNearbyPoints(long, lat);

        try {
            const results = await FeedItemModel.paginate({
                $or: [
                {"place": place},
                {long: {$gte: nearbyOffsetPoints.east, $lte: nearbyOffsetPoints.west},
                lat: {$gte: nearbyOffsetPoints.south, $lte: nearbyOffsetPoints.north}}
                ]
            }, {
                page: page,
                limit: 10,
                sort: {timestamp: -1}
            });

            return res.status(200).json({
                feed: results.docs,
                page: results.page,
                nextPage: results.nextPage,
                hasNext: results.hasNextPage
            });
        }
        catch(err) {
            handleError(res, [err], "Get Feed");
        }
    }

    static async createPost(req, res) {
        const images = req.files;
        const {userId, text, lat, long, place} = req.body;

        try {
            const imageUrls = [];
            for(let image in images) {
                const uploadResponse = await cloudinary.uploader.upload(image.path,
                {
                    public_id: userId + image.path,
                    folder: "feed"
                });
                imageUrls.push(uploadResponse.secure_url);
            }

            const user = await UserModel.findById(userId);
            if(!user) {
                return res.status(404).json({
                    error: "User not found."
                });
            }

            const feedItem = new FeedItemModel({
                userId: userId,
                text: text,
                lat: lat,
                long: long,
                place: place,
                userName: user.name,
                imageUrls: imageUrls
            });
            const savedFeedItem = await feedItem.save();

            return res.status(200).json(savedFeedItem);
        }
        catch(err) {
            handleError(res, [err], "Create Feed Item");
        }
    }
}


module.exports = FeedController;