import app from "./app.js";  // Import the app from app.js
import dotenv from "dotenv";  // Import dotenv to load environment variables

// Load environment variables from a .env file
dotenv.config();

// Get the port from environment variables or default to 3000
const PORT = process.env.PORT ;  

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
