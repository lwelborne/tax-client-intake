import React, { useEffect, useState, useCallback } from "react";
import "./App.css";                 // Global styles
import AddClient from "./AddClient"; // Component to add a new client
import API from "./api";             // Axios instance for API calls

/**
 * ClientsList Component
 * - Displays list of clients
 * - Allows editing & deleting
 */
function ClientsList({ clients, fetchClients }) {
  // Delete a client
  const handleDelete = async (id) => {
    try {
      await API.delete(`/clients/${id}`);
      fetchClients();
    } catch (err) {
      console.error("Delete failed:", err);
    }
  };

  // Edit a client (basic example)
  const handleEdit = async (id) => {
    const newName = prompt("Enter new name:");
    if (!newName) return;
    try {
      await API.put(`/clients/${id}`, { name: newName });
      fetchClients();
    } catch (err) {
      console.error("Edit failed:", err);
    }
  };

  return (
    <div>
      <h3>Clients</h3>
      {clients.map((client) => (
        <div key={client._id} className="client-item">
          <span>
            {client.name} - {client.email} - {client.phone}
          </span>
          <div>
            <button className="edit" onClick={() => handleEdit(client._id)}>
              Edit
            </button>
            <button className="delete" onClick={() => handleDelete(client._id)}>
              Delete
            </button>
          </div>
        </div>
      ))}
    </div>
  );
}

/**
 * App Component - Root of your frontend
 */
function App() {
  const [clients, setClients] = useState([]);
  con
