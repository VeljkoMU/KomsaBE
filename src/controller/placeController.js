const placeModel = require("../model/place");
const handleError = require("../utils/handleError");

class PlaceController {
  // Get all
  static async getAll(req, res) {
    try {
      const places = await placeModel.find();

      return res.status(200).json(places);
    } catch (err) {
      handleError(res, [err.message], "Get all");
    }
  }

  // Get by ID
  static async getById(req, res) {
    try {
      const place = await placeModel.findById(req.params.id);

      if (!place) {
        return res.status(404).json({ message: "Place not found" });
      }
      return res.status(200).json(place);
    } catch (err) {
      handleError(res, [err.message], "Get By Id");
    }
  }

  // Create
  static async create(req, res) {
    try {
      const newPlace = new placeModel(req.body);
      const savedPlace = await newPlace.save();

      return res.status(201).json(savedPlace);
    } catch (err) {
      handleError(res, [err.message], "Create");
    }
  }

  // Update by ID
  static async update(req, res) {
    try {
      const updatedPlace = await PlaceModel.findByIdAndUpdate(
        req.params.id,
        req.body,
        { new: true, runValidators: true }
      );

      if (!updatedPlace) {
        return res.status(404).json({ message: "Place not found" });
      }

      return res.status(200).json(updatedPlace);
    } catch (err) {
      handleError(res, [err.message], "Update");
    }
  }

  // Delete by ID
  static async delete(req, res) {
    try {
      const deletedPlace = await placeModel.findByIdAndDelete(req.params.id);

      if (!deletedPlace) {
        return res.status(404).json({ message: "Place not found" });
      }
      return res.status(200).json({ message: "Place deleted successfully" });
    } catch (err) {
      handleError(res, [err.message], "Delete");
    }
  }

  //find by location 2km radius
  static async findPlacesByLocation(req, res) {
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
      const places = await placeModel.find(query);

      return res.status(200).json({ places });
    } catch (err) {
      console.error("Error finding places by location:", err);
      handleError(res, [err.message], "Error finding places by location");
    }
  }
}

module.exports = PlaceController;
