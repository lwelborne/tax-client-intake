import React, { useState } from "react";
import "./ClientsList.css";
import API from "./api";

function ClientsList({ clients, fetchClients }) {
  const [editingId, setEditingId] = useState(null);
  const [editForm, setEditForm] = useState({ name: "", email: "", phone: "" });
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  const startEdit = (client) => {
    setEditingId(client._id);
    setEditForm({
      name: client.name,
      email: client.email,
      phone: client.phone,
    });
  };

  const cancelEdit = () => {
    setEditingId(null);
    setEditForm({ name: "", email: "", phone: "" });
  };

  const saveEdit = async (id) => {
    try {
      await API.put(`/clients/${id}`, editForm);
      setEditingId(null);
      fetchClients();
      setMessage("Client successfully updated.");
      setTimeout(() => setMessage(""), 3000);
    } catch (err) {
      console.error("Failed to update client:", err);
      setError("Failed to update client.");
      setTimeout(() => setError(""), 3000);
    }
  };

  const deleteClient = async (id) => {
    try {
      await API.delete(`/clients/${id}`);
      fetchClients();
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
      <h2>Clients</h2> {/* ✅ Added heading back */}

      {message && <div className="success">{message}</div>}
      {error && <div className="error">{error}</div>}

      {clients.length === 0 ? (
        <p>No clients found.</p>
      ) : (
        <ul>
          {clients.map((client) => (
            <li key={client._id} className="client-item">
              {editingId === client._id ? (
                <>
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
                  <span>
                    {client.name} — {client.email} — {client.phone}
                  </span>
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

