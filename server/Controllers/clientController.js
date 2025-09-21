// Import the Client model (represents the "clients" collection in MongoDB)
const Client = require("../models/Client");

/**
 * GET /api/clients
 * Fetch all clients from the database.
 */
const getClients = async (req, res) => {
  try {
    const clients = await Client.find(); // Retrieve all documents in "clients"
    res.json(clients); // Send them as JSON
  } catch (err) {
    res.status(500).json({ error: err.message }); // Handle server errors
  }
};

/**
 * GET /api/clients/:id
 * Fetch a single client by their MongoDB ObjectId.
 */
const getClientById = async (req, res) => {
  try {
    const client = await Client.findById(req.params.id); // Find client by ID

    if (!client) {
      return res.status(404).json({ error: "Client not found" }); // Handle missing client
    }

    res.json(client); // Return the client if found
  } catch (err) {
    // Handle invalid ObjectId format separately
    if (err.name === "CastError") {
      return res.status(400).json({ error: "Invalid client ID" });
    }
    res.status(500).json({ error: err.message });
  }
};

/**
 * POST /api/clients
 * Create a new client.
 */
const createClient = async (req, res) => {
  try {
    const client = new Client(req.body); // Build new client object from request body
    const savedClient = await client.save(); // Save it to the database
    res.status(201).json(savedClient); // Return the created client
  } catch (err) {
    // Validation errors are caught here (required fields, etc.)
    res.status(400).json({ error: err.message });
  }
};

/**
 * PUT /api/clients/:id
 * Update an existing client by ID.
 */
const updateClient = async (req, res) => {
  try {
    const updatedClient = await Client.findByIdAndUpdate(
      req.params.id,   // ID of client to update
      req.body,        // New values
      { new: true, runValidators: true } 
      // new: true → return the updated client, not the old one
      // runValidators: true → ensure updates respect schema rules
    );

    if (!updatedClient) {
      return res.status(404).json({ error: "Client not found" });
    }

    res.json(updatedClient); // Send back updated client
  } catch (err) {
    if (err.name === "CastError") {
      return res.status(400).json({ error: "Invalid client ID" });
    }
    res.status(500).json({ error: err.message });
  }
};

/**
 * DELETE /api/clients/:id
 * Delete a client by ID.
 */
const deleteClient = async (req, res) => {
  try {
    const deletedClient = await Client.findByIdAndDelete(req.params.id);

    if (!deletedClient) {
      return res.status(404).json({ error: "Client not found" });
    }

    res.json({ message: "Client deleted successfully" });
  } catch (err) {
    if (err.name === "CastError") {
      return res.status(400).json({ error: "Invalid client ID" });
    }
    res.status(500).json({ error: err.message });
  }
};

// Export all controller functions so routes can use them
module.exports = {
  getClients,
  getClientById,
  createClient,
  updateClient,
  deleteClient,
};
