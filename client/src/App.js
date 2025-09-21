import React, { useEffect, useState, useCallback } from "react";
import "./App.css";            // Global styles
import AddClient from "./AddClient";   // Component to add a new client
import ClientsList from "./ClientsList"; // Component to view/edit/delete clients
import API from "./api";       // Axios instance for API calls

/**
 * App Component - Root of your frontend
 * - Displays the heading
 * - Manages global client state
 * - Fetches client data from backend
 * - Renders AddClient and ClientsList components
 */
function App() {
  // State: holds all clients fetched from backend
  const [clients, setClients] = useState([]);

  // State: error message (shown if API request fails)
  const [error, setError] = useState("");

  /**
   * Fetch clients from the backend API
   * useCallback ensures the function reference is stable
   * (important since we use it inside useEffect)
   */
  const fetchClients = useCallback(async () => {
    try {
      const res = await API.get("/clients"); // GET request to backend
      setClients(res.data);                  // Update client state
    } catch (err) {
      console.error("Failed to fetch clients:", err);
      setError("Failed to load clients.");   // Show error in UI
      setTimeout(() => setError(""), 3000);  // Clear error after 3s
    }
  }, []);

  /**
   * useEffect: run once on mount to load clients
   * Because fetchClients is wrapped in useCallback, it's safe in deps array
   */
  useEffect(() => {
    fetchClients();
  }, [fetchClients]);

  /**
   * Called after a new client is added
   * Re-fetches client list to keep UI up to date
   */
  const handleClientAdded = () => {
    fetchClients();
  };

  return (
    <div className="container">
      {/* App heading */}
      <h1>Tax Client Intake Form</h1>

      {/* Error message (if API request fails) */}
      {error && <div className="error">{error}</div>}

      {/* Form to add a new client */}
      <AddClient onClientAdded={handleClientAdded} />

      {/* List of existing clients with edit/delete features */}
      <ClientsList clients={clients} fetchClients={fetchClients} />
    </div>
  );
}

export default App;
