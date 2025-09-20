import React, { useEffect, useState, useCallback } from "react";
import "./App.css";
import AddClient from "./AddClient";
import ClientsList from "./ClientsList";
import API from "./api";

function App() {
  const [clients, setClients] = useState([]);
  const [error, setError] = useState("");

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

      <AddClient onClientAdded={handleClientAdded} />
      <ClientsList clients={clients} fetchClients={fetchClients} />
    </div>
  );
}

export default App;
