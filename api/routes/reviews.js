const router = require("express").Router();
const Review = require("../models/Review");
const authMiddleware = require("./auth");

//add review

router.post("/", authMiddleware, async (req, res) => {
  const {content, place} = req.body;
  const newReview = new Review({
    place,
    content,
    user: req.user.id
  });
  try {
    const savedReview = await newReview.save();
    const populatedReview = await Review.findById(savedReview._id).populate('user');
    res.status(200).json(populatedReview);
  } catch (err) {
    res.status(500).json(err);
  }
});

router.delete("/:id", authMiddleware, async (req, res) => {
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

router.get("/:placeId", authMiddleware, async (req, res) => {
  const placeId = req.params.placeId;

  try {
    // Find all reviews associated with the specified place ID
    const reviews = await Review.find({ place: placeId }).populate({
      path: 'user',
      select: '_id name email profileImg'
    }).sort({ createdAt: 1 });

    res.status(200).json(reviews);
  } catch (err) {
    res
      .status(500)
      .json({ message: "An error occurred while fetching reviews" });
  }
});

module.exports = router;