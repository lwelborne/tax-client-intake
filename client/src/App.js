import React, { useEffect, useState, useCallback } from "react";
import "./App.css";                 // Global styles
import AddClient from "./AddClient"; // Component to add a new client
import ClientsList from "./ClientsList"; // Component to view/edit/delete clients
import API from "./api";             // Axios instance for API calls

function App() {
  const [clients, setClients] = useState([]);
  const [error, setError] = useState("");

  // Fetch clients
  const fetchClients = useCallback(async () => {
    try {
      const res = await API.get("/clients");
      setClients(res.data);
    } catch (err) {
      console.error("Failed to fetch clients:", err);
      setError("Failed to load clients.");
      setTimeout(() => setError(""), 3000);
    }
  }, []);

  useEffect(() => {
    fetchClients();
  }, [fetchClients]);

  const handleClientAdded = () => {
    fetchClients();
  };

  return (
    <div className="container">
      <h1>Tax Client Intake Form</h1>

      {error && <div className="error">{error}</div>}

      {/* Put both AddClient + ClientsList inside a single "bubble" */}
      <div className="bubble">
        <AddClient onClientAdded={handleClientAdded} />
        <ClientsList clients={clients} fetchClients={fetchClients} />
      </div>
    </div>
  );
}

export default App;

