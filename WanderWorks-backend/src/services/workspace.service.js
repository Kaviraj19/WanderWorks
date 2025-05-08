import workspaceRepo from "../repositories/workspace.repository.js";

class WorkspaceService {
  async getAllWorkspaces() {
    return workspaceRepo.findAll();
  }

  async getWorkspaceById(id) {
    return workspaceRepo.findById(id);
  }

  async addWorkspace(workspaceData) {
    return workspaceRepo.create(workspaceData);
  }

  async updateWorkspace(id, workspaceData) {
    return workspaceRepo.update(id, workspaceData);
  }

  async deleteWorkspace(id) {
    return workspaceRepo.delete(id);
  }

  // 🆕 Filter by workspace type
  async getWorkspacesByType(type) {
    return workspaceRepo.findByType(type);
  }

  // 🆕 Filter by amenities (tags should be passed as an array)
  async getWorkspacesByAmenities(tags) {
    return workspaceRepo.findByAmenities(tags);
  }
}

export default new WorkspaceService();
