import sequelize from "../config/db.config.js";
import User from "./user.model.js";
import Review from "./review.model.js";
import Workspace from "./workspace.model.js";

// Define associations here
User.hasMany(Review, { foreignKey: "user_id" });
Review.belongsTo(User, { foreignKey: "user_id" });

Workspace.hasMany(Review, { foreignKey: "workspace_id" });
Review.belongsTo(Workspace, { foreignKey: "workspace_id" });

export { sequelize, User, Review, Workspace };
