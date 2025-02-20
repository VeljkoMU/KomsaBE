const businessModel = require("../model/business");
const handleError = require("../utils/handleError");
class BusinessController {
  // Get all
  static async getAll(req, res) {
    try {
      const businesses = await businessModel.find();

      res.status(200).json(businesses);
    } catch (err) {
      handleError(res, [err.message], "Get All");
    }
  }

  // Get by ID
  static async getById(req, res) {
    try {
      const business = await businessModel.findById(req.params.id);

      if (!business) {
        return res.status(404).json({ message: "Business not found" });
      }
      res.status(200).json(business);
    } catch (err) {
      handleError(res, [err.message], "Get By Id");
    }
  }

  // Create
  static async create(req, res) {
    try {
      const newBusiness = new businessModel(req.body);
      const savedBusiness = await newBusiness.save();

      res.status(201).json(savedBusiness);
    } catch (err) {
      handleError(res, [err.message], "Create");
    }
  }

  // Update by ID
  static async update(req, res) {
    try {
      const updatedBusiness = await businessModel.findByIdAndUpdate(
        req.params.id,
        req.body,
        { new: true, runValidators: true }
      );

      if (!updatedBusiness) {
        return res.status(404).json({ message: "Business not found" });
      }
      res.status(200).json(updatedBusiness);
    } catch (err) {
      handleError(res, [err.message], "Update");
    }
  }

  // Delete by ID
  static async delete(req, res) {
    try {
      const deletedBusiness = await businessModel.findByIdAndDelete(
        req.params.id
      );

      if (!deletedBusiness) {
        return res.status(404).json({ message: "Business not found" });
      }
      res.status(200).json({ message: "Business deleted successfully" });
    } catch (err) {
      handleError(res, [err.message], "Delete");
    }
  }

  //find by location 2km radius
  static async findBusinessByLocation(req, res) {
    const { long, lat, address } = req.query;
    if (!long || !lat) {
      return res
        .status(400)
        .json({ error: "Longitude and latitude are required." });
    }

    try {
      const nearbyOffsetPoints = generateNearbyPoints(
        parseFloat(long),
        parseFloat(lat),
        2
      );
      const proximityQuery = {
        location: {
          $geoWithin: {
            $box: [
              [nearbyOffsetPoints.west, nearbyOffsetPoints.south],
              [nearbyOffsetPoints.east, nearbyOffsetPoints.north],
            ],
          },
        },
      };
      const addressQuery = address ? { address: address } : {};
      const query = address
        ? { $or: [proximityQuery, addressQuery] }
        : proximityQuery;
      const businesses = await BusinessModel.find(query);

      return res.status(200).json({ businesses });
    } catch (err) {
      console.error("Error finding businesses by location:", err);
      handleError(res, [err.message], "Error finding businesses by location");
    }
  }
}

module.exports = BusinessController;
