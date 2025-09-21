// Import mongoose to define a schema and create a model
const mongoose = require("mongoose");

/**
 * Define the schema for a Client document.
 * A schema is like a blueprint — it tells MongoDB what fields
 * each client should have and applies validation rules.
 */
const clientSchema = new mongoose.Schema(
  {
    // Name: required text field
    name: { type: String, required: true },

    // Email: required text field (you already validate format in routes with express-validator)
    email: { type: String, required: true },

    // Phone: required text field (you validate length in routes)
    phone: { type: String, required: true },
  },
  {
    // Automatically add createdAt and updatedAt fields to each document
    timestamps: true,
  },
);

/**
 * Export a Mongoose model based on the schema.
 * - First argument "Client" = collection name will be "clients" in MongoDB.
 * - Second argument = the schema definition.
 */
module.exports = mongoose.model("Client", clientSchema);
