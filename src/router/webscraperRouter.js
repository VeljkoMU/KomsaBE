const express = require("express");
const auth = require("../middleware/auth");
const validateNews = require("../middleware/validators/webscraperValidator");
const WebScraperController = require("../controller/webscraperController");
const router = express.Router();

router.get("/getByLocation", validateNews, WebScraperController.getNewsByLocation);

module.exports = router;