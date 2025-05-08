import workspaceService from "../services/workspace.service.js";

const getAllWorkspaces = async (req, res) => {
  try {
    const { type, amenities } = req.query;
    let workspaces;

    if (type) {
      workspaces = await workspaceService.getWorkspacesByType(type);
    } else if (amenities) {
      const tags = amenities.split(",");
      workspaces = await workspaceService.getWorkspacesByAmenities(tags);
    } else {
      workspaces = await workspaceService.getAllWorkspaces();
    }

    res.json(workspaces);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const getWorkspaceById = async (req, res) => {
  try {
    const workspace = await workspaceService.getWorkspaceById(req.params.id);
    if (workspace) {
      res.json(workspace);
    } else {
      res.status(404).json({ message: "Workspace not found" });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const addWorkspace = async (req, res) => {
  try {
    const newWorkspace = await workspaceService.addWorkspace(req.body);
    res.status(201).json(newWorkspace);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const updateWorkspace = async (req, res) => {
  try {
    const updatedWorkspace = await workspaceService.updateWorkspace(req.params.id, req.body);
    res.json(updatedWorkspace);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const deleteWorkspace = async (req, res) => {
  try {
    await workspaceService.deleteWorkspace(req.params.id);
    res.json({ message: "Workspace deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export default {
  getAllWorkspaces,
  getWorkspaceById,
  addWorkspace,
  updateWorkspace,
  deleteWorkspace,
};
