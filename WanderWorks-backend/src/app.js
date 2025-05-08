import express, { json } from "express";
import cors from "cors"; // Import CORS
import sequelize from "./config/db.config.js";  // Import the Sequelize instance
import workspaceRoutes from "./routes/workspace.routes.js";  // Workspace routes
import userRoutes from "./routes/user.routes.js";  // User routes
import bookingRoutes from "./routes/booking.routes.js";  // Booking routes
import paymentRoutes from "./routes/payment.routes.js";  // Payment routes
import reviewRoutes from "./routes/review.routes.js";  // Review routes
import { logger } from "./middleware/auth.middleware.js";
import User from "./models/user.model.js";
import Review from "./models/review.model.js";

const app = express();

// Middleware to parse JSON bodies
app.use(json());
app.use(logger);

// Enable CORS (Cross-Origin Resource Sharing)
app.use(cors({
  origin: 'http://localhost:3000',  // Allow requests from your React frontend
  methods: ['GET', 'POST', 'PUT', 'DELETE'],  // Allow specific HTTP methods
  credentials: true,  // Allow credentials (cookies or auth headers)
}));
User.hasMany(Review, { foreignKey: "user_id" });
Review.belongsTo(User, { foreignKey: "user_id" });

// Register routes
app.use("/api/workspaces", workspaceRoutes);
app.use("/api/users", userRoutes);
app.use("/api/bookings", bookingRoutes);
app.use("/api/payments", paymentRoutes);  // Add payments route
app.use("/api/reviews", reviewRoutes);    // Add reviews route

// Sync the database (Ensure the database is synchronized with the models)
sequelize.sync({ alter: true }).then(() => {
  console.log("Database synced successfully");
}).catch((error) => {
  console.error("Error syncing the database:", error);
});

// Export the app for use in server.js
export default app;
