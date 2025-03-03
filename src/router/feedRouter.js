const express = require("express");
const auth = require("../middleware/auth");
const FeedController = require("../controller/feedController");
const multer = require("multer");
const { validateGetFeed, validateCreateFeedPost } = require("../middleware/validators/feedValidator");
const upload = multer({storage: multer.memoryStorage()})
const router = express.Router();

router.get("/", auth, validateGetFeed, FeedController.getFeed);
router.post("/create", auth, validateCreateFeedPost, upload.array("images", 3), FeedController.createPost);

module.exports = router;