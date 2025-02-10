const businessModel = require("../model/business");

class BusinessController {
  // Get all
  static async getAll(req, res) {
    try {
      const businesses = await businessModel.find();

      res.status(200).json(businesses);
    } catch (error) {
      res.status(500).json({ error: error.message });
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
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }

  // Create
  static async create(req, res) {
    try {
      const newBusiness = new businessModel(req.body);
      const savedBusiness = await newBusiness.save();

      res.status(201).json(savedBusiness);
    } catch (error) {
      res.status(400).json({ error: error.message });
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
    } catch (error) {
      res.status(400).json({ error: error.message });
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
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }
}

module.exports = BusinessController;
