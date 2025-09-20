# Tax Client Intake Application (Backend)

This is the **Express + Node.js backend** for the Tax Client Intake project.  
It provides a REST API for managing client intake data stored in **MongoDB Atlas**.

---

## Features

- **Create Clients**: Save new client records (name, email, phone).
- **Read Clients**: Fetch all stored clients.
- **Update Clients**: Modify client details by ID.
- **Delete Clients**: Remove client records by ID.
- **Validation**: Ensures required fields are present and valid.
- **CORS Protection**: Restricts access to trusted frontend origins.
- **Environment Variables**: Uses `.env` for secrets and configuration.

---

## Tech Stack

- **Runtime**: Node.js
- **Framework**: Express.js
- **Database**: MongoDB Atlas (via Mongoose)
- **Validation**: express-validator
- **Environment**: dotenv
- **CORS Middleware**: cors



