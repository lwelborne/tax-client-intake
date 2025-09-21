// Import Axios library for making HTTP requests
import axios from "axios";

// Create a pre-configured Axios instance
const API = axios.create({
  // The base URL for all API requests:
  // - First, try to use the environment variable (from .env file)
  // - If not defined, fall back to localhost (useful for local dev)
  baseURL: process.env.REACT_APP_API_URL || "http://localhost:5000/api",
  // Example:
  //   REACT_APP_API_URL=https://your-deployed-api.onrender.com/api
  //   API.get("/clients") → https://your-deployed-api.onrender.com/api/clients
  //   (instead of writing the full URL everywhere)
});

// Export the configured Axios instance so it can be imported across the app
export default API;
