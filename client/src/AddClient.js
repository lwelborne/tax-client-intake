import React, { useState } from "react";
import API from "./api";          // Centralized Axios instance for backend calls
import "./AddClient.css";         // Import styles

/**
 * AddClient Component
 * Props:
 *  - onClientAdded: callback function to notify parent (App.js) when a new client is added
 */
function AddClient({ onClientAdded }) {
  // Form state
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");

  // UI feedback state
  const [success, setSuccess] = useState("");
  const [error, setError] = useState("");

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await API.post("/clients", { name, email, phone });
      setSuccess("Client added successfully!");
      setError("");
      setName("");
      setEmail("");
      setPhone("");
      onClientAdded(); // Refresh client list
      setTimeout(() => setSuccess(""), 3000);
    } catch (err) {
      console.error("Failed to add client:", err);
      setError("Failed to add client. Please try again.");
      setSuccess("");
      setTimeout(() => setError(""), 3000);
    }
  };

  return (
    <div>
      <h3>Add Client</h3>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
        />
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <input
          type="tel"
          placeholder="Phone"
          value={phone}
          onChange={(e) => setPhone(e.target.value)}
          required
        />
        <button type="submit" className="add">Add Client</button>
      </form>

      {/* Messages */}
      {success && <div className="success">{success}</div>}
      {error && <div className="error">{error}</div>}

      {/* Note */}
      <p className="form-note">
        This intake form is for the 2026 filing season.
      </p>
    </div>
  );
}

export default AddClient;
