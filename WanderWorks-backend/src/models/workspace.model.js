import { DataTypes } from "sequelize";
import sequelize from "../config/db.config.js";

const Workspace = sequelize.define("Workspace", {
  id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },

  name: { type: DataTypes.STRING, allowNull: false },
  location: { type: DataTypes.STRING, allowNull: false },

  type: {
  type: DataTypes.ARRAY(DataTypes.STRING),
  allowNull: false,
  defaultValue: [],
  validate: {
    isValidType(value) {
      const validTypes = ["coworking", "private_office", "virtual_office", "meeting_room"];
      const isValid = value.every((v) => validTypes.includes(v));
      if (!isValid) {
        throw new Error("Invalid workspace type(s) provided.");
      }
    },
  },
},


  // Booking types and rates
  rate_day_pass: { type: DataTypes.FLOAT, allowNull: true },
  rate_long_term: { type: DataTypes.FLOAT, allowNull: true },

  available: { type: DataTypes.BOOLEAN, defaultValue: true },

  // Tags / amenities (stored as array of strings in Postgres)
  amenities: {
    type: DataTypes.ARRAY(DataTypes.STRING),
    defaultValue: [],
  },
});

export default Workspace;
