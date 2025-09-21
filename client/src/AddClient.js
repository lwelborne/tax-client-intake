import React, { useState } from "react";
import API from "./api";   // Centralized Axios instance for backend calls
import "./AddClient.css";  // Styles for the add client form

/**
 * AddClient Component
 * Props:
 *  - onClientAdded: callback function to notify parent (App.js) when a new client is added
 */
function AddClient({ onClientAdded }) {
  // Form field states
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");

  // UI feedback states
  const [success, setSuccess] = useState(false); // Tracks success message
  const [error, setError] = useState("");        // Tracks error messages

  /**
   * Handle form submission → POST new client to backend
   */
  const handleSubmit = async (e) => {
    e.preventDefault();   // Prevent page reload
    setSuccess(false);    // Reset success state
    setError("");         // Reset error state

    try {
      // Send client data to backend API
      await API.post("/clients", { name, email, phone }); 
      setSuccess(true); // Show success message

      // Notify parent (App.js) to refresh client list
      if (onClientAdded) onClientAdded();

      // Reset form fields
      setName("");
      setEmail("");
      setPhone("");
    } catch (err) {
      console.error("Error adding client:", err);
      setError("Unable to add client. Please check your information and try again.");
    }
  };

  return (
    <div className="add-client">
      <h2>Add Client</h2>

      {/* Form to capture client input */}
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
        <button type="submit" className="add">
          Add Client
        </button>
      </form>

      {/* Feedback messages */}
      {success && <p className="success">Client added successfully!</p>}
      {error && <p className="error">{error}</p>}

      {/* Small note below the form */}
      <p className="form-note">
        This intake form is for the 2026 filing season.
      </p>
    </div>
  );
}

export default AddClient;

