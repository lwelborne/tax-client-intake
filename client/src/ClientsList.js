import React, { useState } from "react";
import "./ClientsList.css"; // Styles specific to the client list UI
import API from "./api";    // Pre-configured Axios instance for API requests

/**
 * ClientsList component
 * Props:
 *  - clients: array of client objects to display
 *  - fetchClients: function to refresh the client list from the server
 */
function ClientsList({ clients, fetchClients }) {
  // Track which client is currently being edited (null if none)
  const [editingId, setEditingId] = useState(null);

  // Store temporary form data for editing a client
  const [editForm, setEditForm] = useState({ name: "", email: "", phone: "" });

  // Success and error messages shown in the UI
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  /**
   * Begin editing a client → pre-fill the edit form with client data
   */
  const startEdit = (client) => {
    setEditingId(client._id);
    setEditForm({
      name: client.name,
      email: client.email,
      phone: client.phone,
    });
  };

  /**
   * Cancel editing → reset edit form and editing state
   */
  const cancelEdit = () => {
    setEditingId(null);
    setEditForm({ name: "", email: "", phone: "" });
  };

  /**
   * Save client edits by sending PUT request to API
   */
  const saveEdit = async (id) => {
    try {
      await API.put(`/clients/${id}`, editForm); // Update client in backend
      setEditingId(null);                        // Exit edit mode
      fetchClients();                            // Refresh list
      setMessage("Client successfully updated."); 
      setTimeout(() => setMessage(""), 3000);    // Auto-hide after 3s
    } catch (err) {
      console.error("Failed to update client:", err);
      setError("Failed to update client.");
      setTimeout(() => setError(""), 3000);
    }
  };

  /**
   * Delete a client by ID (sends DELETE request to API)
   */
  const deleteClient = async (id) => {
    try {
      await API.delete(`/clients/${id}`);        // Remove client in backend
      fetchClients();                            // Refresh list
      setMessage("Client successfully deleted.");
      setTimeout(() => setMessage(""), 3000);
    } catch (err) {
      console.error("Failed to delete client:", err);
      setError("Failed to delete client.");
      setTimeout(() => setError(""), 3000);
    }
  };

  return (
    <div>
      <h2>Clients</h2> {/* Section heading */}

      {/* Feedback messages */}
      {message && <div className="success">{message}</div>}
      {error && <div className="error">{error}</div>}

      {/* If no clients → show placeholder, else render list */}
      {clients.length === 0 ? (
        <p>No clients found.</p>
      ) : (
        <ul>
          {clients.map((client) => (
            <li key={client._id} className="client-item">
              {/* If editing this client → show edit form */}
              {editingId === client._id ? (
                <>
                  {/* Editable inputs */}
                  <input
                    type="text"
                    value={editForm.name}
                    onChange={(e) =>
                      setEditForm({ ...editForm, name: e.target.value })
                    }
                  />
                  <input
                    type="email"
                    value={editForm.email}
                    onChange={(e) =>
                      setEditForm({ ...editForm, email: e.target.value })
                    }
                  />
                  <input
                    type="tel"
                    value={editForm.phone}
                    onChange={(e) =>
                      setEditForm({ ...editForm, phone: e.target.value })
                    }
                  />
                  {/* Action buttons for saving/canceling */}
                  <div className="actions">
                    <button
                      className="update"
                      onClick={() => saveEdit(client._id)}
                    >
                      Save
                    </button>
                    <button className="delete" onClick={cancelEdit}>
                      Cancel
                    </button>
                  </div>
                </>
              ) : (
                <>
                  {/* Display client info (read-only mode) */}
                  <span>
                    {client.name} — {client.email} — {client.phone}
                  </span>
                  {/* Action buttons for editing/deleting */}
                  <div className="actions">
                    <button
                      className="update"
                      onClick={() => startEdit(client)}
                    >
                      Edit
                    </button>
                    <button
                      className="delete"
                      onClick={() => deleteClient(client._id)}
                    >
                      Delete
                    </button>
                  </div>
                </>
              )}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default ClientsList;


