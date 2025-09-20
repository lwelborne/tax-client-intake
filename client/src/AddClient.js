
import React, { useState } from "react";
import API from "./api";   // <-- use centralized API instance
import "./AddClient.css";

function AddClient({ onClientAdded }) {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSuccess(false);
    setError("");

    try {
      await API.post("/clients", { name, email, phone }); 
      setSuccess(true);

      if (onClientAdded) onClientAdded();

      // Reset form
      setName("");
      setEmail("");
      setPhone("");
    } catch (err) {
      setError("Unable to add client. Please check your information and try again.");
    }
  };

  return (
    <div className="add-client">
      <h2>Add Client</h2>
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

      {success && <p className="success">Client added successfully!</p>}
      {error && <p className="error">{error}</p>}

      <p className="form-note">
        This intake form is for the 2026 filing season.
      </p>
    </div>
  );
}

export default AddClient;
