const Client = require("../models/Client");

const getClients = async (req, res) => {
  try {
    const clients = await Client.find();
    res.json(clients);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

const getClientById = async (req, res) => {
  try {
    const client = await Client.findById(req.params.id);

    if (!client) {
      return res.status(404).json({ error: "Client not found" });
    }

    res.json(client);
  } catch (err) {
    if (err.name === "CastError") {
      return res.status(400).json({ error: "Invalid client ID" });
    }
    res.status(500).json({ error: err.message });
  }
};

const createClient = async (req, res) => {
  try {
    const client = new Client(req.body);
    const savedClient = await client.save();
    res.status(201).json(savedClient);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

const updateClient = async (req, res) => {
  try {
    const updatedClient = await Client.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true },
    );

    if (!updatedClient) {
      return res.status(404).json({ error: "Client not found" });
    }

    res.json(updatedClient);
  } catch (err) {
    if (err.name === "CastError") {
      return res.status(400).json({ error: "Invalid client ID" });
    }
    res.status(500).json({ error: err.message });
  }
};

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

module.exports = {
  getClients,
  getClientById,
  createClient,
  updateClient,
  deleteClient,
};
