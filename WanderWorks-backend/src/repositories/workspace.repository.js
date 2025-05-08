import Workspace from "../models/workspace.model.js";
import { Op } from "sequelize";

class WorkspaceRepository {
  async findAll() {
    return Workspace.findAll();
  }

  async findById(id) {
    return Workspace.findByPk(id);
  }

  async create(workspaceData) {
    return Workspace.create(workspaceData);
  }

  async update(id, workspaceData) {
    await Workspace.update(workspaceData, { where: { id } });
    return this.findById(id); // return updated record
  }

  async delete(id) {
    return Workspace.destroy({ where: { id } });
  }

  // Filter by type (e.g., coworking, private_office, etc.)
  async findByType(type) {
    return Workspace.findAll({ where: { type } });
  }

  // Filter by amenities (contains any of the given tags)
  async findByAmenities(tags = []) {
    return Workspace.findAll({
      where: {
        amenities: {
          [Op.contains]: tags, // PostgreSQL only
        },
      },
    });
  }
}

export default new WorkspaceRepository();
