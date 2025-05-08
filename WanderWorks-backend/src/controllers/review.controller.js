import reviewService from "../services/review.service.js";

// Get all reviews
export const getAllReviews = async (_req, res) => {
  try {
    const reviews = await reviewService.getAllReviews();
    res.status(200).json(reviews);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Get review by ID
export const getReviewById = async (req, res) => {
  try {
    const review = await reviewService.getReviewById(req.params.id);
    if (!review) {
      return res.status(404).json({ error: "Review not found" });
    }
    res.status(200).json(review);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Get reviews for a specific workspace
export const getReviewsForWorkspace = async (req, res) => {
  const { workspace_id } = req.params;
  try {
    const reviews = await reviewService.getReviewsByWorkspaceId(workspace_id);
    res.status(200).json(reviews);
  } catch (error) {
    console.error("Error fetching workspace reviews:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

// Create a new review
export const createReview = async (req, res) => {
  try {
    const newReview = await reviewService.createReview(req.body);
    res.status(201).json(newReview);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

// Update an existing review
export const updateReview = async (req, res) => {
  try {
    const updatedReview = await reviewService.updateReview(req.params.id, req.body);
    if (!updatedReview) {
      return res.status(404).json({ error: "Review not found" });
    }
    res.status(200).json(updatedReview);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

// Delete a review
export const deleteReview = async (req, res) => {
  try {
    await reviewService.deleteReview(req.params.id);
    res.status(200).json({ message: "Review deleted successfully" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

export default {
  getAllReviews,
  getReviewById,
  getReviewsForWorkspace,
  createReview,
  updateReview,
  deleteReview,
};
