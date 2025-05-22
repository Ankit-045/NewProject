const express = require("express");
const router = express.Router({ mergeParams: true });
const wrapAsync = require("../utils/wrapAsync.js");
const ExpressError = require("../utils/ExpressError.js");
const Review = require("../models/review");
const Listing = require("../models/listing");
const { validateReview, isloggedin, isReviewAuthor } = require("../middleware.js");
const reviewController = require("../controllers/review.js")
const review = require("../models/review.js")
//Post Reviews route
router.post(
  "/",
  isloggedin,
  validateReview,
  wrapAsync(reviewController.createReview)
);

//  Delete reviews Route
router.delete(
  "/:reviewId",
  isloggedin, isReviewAuthor,
  wrapAsync(reviewController.destroyReview)
);
module.exports = router;
