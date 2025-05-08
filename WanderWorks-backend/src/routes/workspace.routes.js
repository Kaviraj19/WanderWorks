import express from "express";
import workspaceController from "../controllers/workspace.controller.js";


const router = express.Router();

// 📂 Public: Get all workspaces or single workspace
router.get("/", workspaceController.getAllWorkspaces);
router.get("/:id", workspaceController.getWorkspaceById);

// 🔐 Protected: Only authenticated users (e.g., workspace owners or admins) can create/update
router.post("/", workspaceController.addWorkspace);
router.put("/:id", workspaceController.updateWorkspace);

router.delete("/:id", workspaceController.deleteWorkspace);

export default router;
