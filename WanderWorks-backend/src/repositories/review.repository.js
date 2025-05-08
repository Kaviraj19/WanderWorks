// repositories/review.repository.js
import { Review, User } from "../models/index.js";
  // Importing the Review model

class ReviewRepository {
  async findAll() {
    return await Review.findAll();
  }

  async findById(id) {
    return await Review.findByPk(id);
  }

  async create(reviewData) {
    return await Review.create(reviewData);
  }
  async findByWorkspaceId(workspace_id) {
    return await Review.findAll({
      where: { workspace_id },
      include: [
        {
          model: User,
          attributes: ["username"], // 👈 Only get username
        },
      ],
    });
  }

  async update(id, reviewData) {
    return await Review.update(reviewData, { where: { id } });
  }

  async delete(id) {
    return await Review.destroy({ where: { id } });
  }
}

export default new ReviewRepository();  // Exporting as a default export
