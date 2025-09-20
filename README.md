# Tax Client Intake Application (Tax Season 2026)

## Overview

The **Tax Client Intake Application** is a full-stack web application developed as part of **CIS375 – Human-Computer Interaction** at Strayer University. This capstone project brings together everything I’ve learned in previous classes by integrating a user-friendly interface, a robust API, and a secure database backend.

Designed for real-world use in tax preparation for the 2026 filing season, the application streamlines the process of collecting and managing client information. Tax professionals can easily add, view, update, and delete client records through a simple digital interface. All client data is securely stored in MongoDB, making it easier to organize and access during tax season while demonstrating essential CRUD (Create, Read, Update, Delete) operations.

## Features

- Add new tax clients through a digital intake form
- View all clients or a single client by ID
- Update client details such as phone number or income
- Delete client records
- CRUD operations tested and documented using Postman

## Tech Stack

- **Frontend**: React (bootstrapped with Create React App)
- **Backend**: Node.js + Express
- **Database**: MongoDB Atlas
- **Hosting & Deployment**: Render (frontend & backend)
- **API Testing**: Postman
- **Code Quality & Formatting**: ESLint + Prettier

## Setup Instructions

1. **Download the project ZIP file** and extract it.  
   -Open a terminal and navigate to the project folder:

   ```bash
   cd tax-client-intake

   ```

2. **Set up environment variables**
   - Inside the `server` folder, create a `.env` file with:
     ```
     MONGO_URI=your_mongodb_connection_string
     PORT=5000
     ```

3. **Install dependencies**
   - Backend:
     ```bash
     cd server
     npm install
     npm start
     ```
   - Frontend:
     ```bash
     cd ../client
     npm install
     npm start
     ```

4. **Open the app**
   - Frontend: [http://localhost:3000](http://localhost:3000)
   - Backend API: [http://localhost:5000/api/clients](http://localhost:5000/api/clients)

## Testing

- Test cases are documented in **TestCases.xlsx** (included in this project).
- API endpoints tested with Postman:
  - `POST /api/clients` → Create new client
  - `GET /api/clients` → Get all clients
  - `GET /api/clients/:id` → Get client by ID
  - `PUT /api/clients/:id` → Update client by ID
  - `DELETE /api/clients/:id` → Delete client by ID

## Code Quality

This project uses **ESLint** and **Prettier** to maintain clean and consistent code formatting.

- Run linting and fix issues:
  ```bash
  npm run lint
  ```
- Format all files:
  ```bash
  npm run format
  ```

## Author

**Lenora Welborne**  
Bachelor of Science in Software Development  
Strayer University — Graduated: September 2025
