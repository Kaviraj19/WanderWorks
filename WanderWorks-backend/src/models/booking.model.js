import { DataTypes } from "sequelize";
import sequelize from "../config/db.config.js";
import Workspace from "./workspace.model.js";
import User from "./user.model.js";

const Booking = sequelize.define("Booking", {
  id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },

  user_id: { type: DataTypes.INTEGER, allowNull: false },
  workspace_id: { type: DataTypes.INTEGER, allowNull: false },

  start_time: { type: DataTypes.DATE, allowNull: false },
  end_time: { type: DataTypes.DATE, allowNull: false },

  booking_type: {
    type: DataTypes.ENUM("day_pass", "weekly", "long_term"),
    allowNull: false,
  },

  // Total cost for this booking
  total_cost: {
    type: DataTypes.FLOAT,
    allowNull: false,
    defaultValue: 0.0,
  },

  status: {
    type: DataTypes.STRING,
    defaultValue: "pending",
  },
});

// Associations
Booking.belongsTo(User, { foreignKey: "user_id" });
Booking.belongsTo(Workspace, { foreignKey: "workspace_id" });

export default Booking;
