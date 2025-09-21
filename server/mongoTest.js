
// Import the MongoDB client and API version helper
const { MongoClient, ServerApiVersion } = require("mongodb");

// Load environment variables (MONGO_URI comes from .env file)
require("dotenv").config();
const uri = process.env.MONGO_URI; // Example: mongodb+srv://user:pass@cluster/dbname

// Create a new MongoClient instance with specific server API options
const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1, // Use stable API version 1
    strict: true,                 // Enforce strict mode to prevent unsupported commands
    deprecationErrors: true,      // Warn when using deprecated features
  },
});

async function run() {
  try {
    // Connect to the MongoDB server/cluster
    await client.connect();

    // Send a ping to confirm a successful connection
    // "admin" database is used for this health check
    await client.db("admin").command({ ping: 1 });

    console.log("Pinged your deployment. Successfully connected to MongoDB!");
  } catch (err) {
    // If anything goes wrong (bad URI, no network, wrong credentials, etc.)
    console.error("Connection failed:", err);
  } finally {
    // Always close the client after test, whether success or error
    await client.close();
  }
}

// Execute the run() function and catch any unhandled errors
run().catch(console.dir);
