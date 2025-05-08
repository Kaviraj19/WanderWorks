import reviewRepo from "../repositories/review.repository.js";

class ReviewService {
  async getAllReviews() {
    return await reviewRepo.findAll();
  }

  async getReviewById(id) {
    return await reviewRepo.findById(id);
  }

  async createReview(data) {
    return await reviewRepo.create(data);
  }

async getReviewsByWorkspaceId(workspace_id) {
  return await reviewRepo.findByWorkspaceId(workspace_id);
}

  async updateReview(id, data) {
    const [updated] = await reviewRepo.update(id, data);
    return updated;
  }

  async deleteReview(id) {
    return await reviewRepo.delete(id);
  }
}

export default new ReviewService();
