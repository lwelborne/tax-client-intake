// Import core dependencies
const express = require("express"); // Framework for building web APIs
const mongoose = require("mongoose"); // ODM library for MongoDB
const cors = require("cors"); // Middleware to allow cross-origin requests
const dotenv = require("dotenv"); // Loads environment variables from .env file

// Load environment variables into process.env
dotenv.config();

// Initialize the Express application
const app = express();

// Define server port and MongoDB connection string
// PORT comes from .env or defaults to 5000 for local development
const PORT = process.env.PORT || 5000;
const MONGO_URI = process.env.MONGO_URI; // Securely pulled from .env file

// Define which frontend URLs are allowed to connect to this backend
const allowedOrigins = [
  "http://localhost:3000", // Local React development server
  "https://frontend-ts4x.onrender.com", // Deployed frontend on Render
];

// Configure CORS (Cross-Origin Resource Sharing)
// This prevents unauthorized domains from making requests to your backend
app.use(
  cors({
    origin: (origin, callback) => {
      // Allow requests with no origin (like Postman) OR requests from allowedOrigins
      if (!origin || allowedOrigins.includes(origin)) {
        callback(null, true);
      } else {
        callback(new Error("Not allowed by CORS")); // Reject requests from unknown origins
      }
    },
    credentials: true, // Allows cookies/authorization headers across origins
  })
);

// Middleware to parse incoming JSON requests
// e.g., req.body will automatically contain JSON payloads
app.use(express.json());

// Import client-related routes and mount them under /api/clients
// Example: GET /api/clients, POST /api/clients
const clientRoutes = require("./routes/clientRoutes");
app.use("/api/clients", clientRoutes);

// A simple test route to confirm the server is working
app.get("/", (req, res) => {
  res.send("Server is running and connected.");
});

// Function to connect to MongoDB and then start the server
async function startServer() {
  try {
    // Connect to MongoDB using connection string from .env
    await mongoose.connect(MONGO_URI);
    console.log("MongoDB connected");

    // Start the Express server once DB is connected
    app.listen(PORT, () =>
      console.log(`Server running on http://localhost:${PORT}`)
    );
  } catch (err) {
    // If DB connection fails, log error and exit process
    console.error("MongoDB connection error:", err);
    process.exit(1);
  }
}

// Run the startup function
startServer();

