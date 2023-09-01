const router = require("express").Router();
const Review = require("../models/Review");

//add review

router.post("/", async (req, res) => {
  const newReview = new Review(req.body);

  try {
    const savedReview = await newReview.save();
    res.status(200).json(savedReview);
  } catch (err) {
    res.status(500).json(err);
  }
});

router.delete("/:id", async (req, res) => {
  const reviewId = req.params.id;

  try {
    // Find the review by its ID and remove it
    const deletedReview = await Review.findByIdAndDelete(reviewId);

    if (!deletedReview) {
      return res.status(404).json({ message: "Review not found" });
    }

    res.status(200).json({ message: "Review deleted successfully" });
  } catch (err) {
    res
      .status(500)
      .json({ message: "An error occurred while deleting the review" });
  }
});

router.get("/:placeId", async (req, res) => {
  const placeId = req.params.placeId;

  try {
    // Find all reviews associated with the specified place ID
    const reviews = await Review.find({ place: placeId });

    res.status(200).json(reviews);
  } catch (err) {
    res
      .status(500)
      .json({ message: "An error occurred while fetching reviews" });
  }
});

module.exports = router;