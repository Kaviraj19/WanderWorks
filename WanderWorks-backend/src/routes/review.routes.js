import { Router } from "express";
import reviewController from "../controllers/review.controller.js"; // Import controller
import { authenticateToken } from '../middleware/auth.middleware.js';
const router = Router();

// Here we directly map routes to controller methods
router.get("/workspace_id/:workspace_id", reviewController.getReviewsForWorkspace);  

router.get("/:id", reviewController.getReviewById);  // Review by ID
router.post("/", reviewController.createReview);  // Create a review
router.put("/:id", reviewController.updateReview);  // Update review by ID
router.delete("/:id", authenticateToken, reviewController.deleteReview);  // Delete review by ID

export default router;
