// Import core dependencies
const express = require("express");
// express-validator helps validate/sanitize request data before it reaches the controller
const { body, validationResult } = require("express-validator");

// Import controller functions (business logic for each route)
const {
  getClients,
  getClientById,
  createClient,
  updateClient,
  deleteClient,
} = require("../Controllers/clientController");

// Create a new Express router instance
// All routes defined here will be prefixed in server.js with "/api/clients"
const router = express.Router();

/**
 * Middleware: validate()
 * Checks for validation errors after running express-validator rules.
 * If errors exist → respond with 400 and the error details.
 * If no errors → continue to the next middleware/controller.
 */
const validate = (req, res, next) => {
  const errors = validationResult(req); // Collect validation results
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() }); // Return errors to client
  }
  next(); // Move on to the actual route handler
};

// -------------------- ROUTES -------------------- //

// @route   GET /api/clients
// @desc    Fetch all clients from the database
router.get("/", getClients);

// @route   GET /api/clients/:id
// @desc    Fetch a single client by their MongoDB ObjectId
router.get("/:id", getClientById);

// @route   POST /api/clients
// @desc    Create a new client
// @access  Public (can add authentication later if needed)
// Middleware chain:
//   1. express-validator rules check the body
//   2. validate() middleware returns errors if rules fail
//   3. createClient controller saves the client if data is valid
router.post(
  "/",
  [
    body("name").notEmpty().withMessage("Name is required"),
    body("email").isEmail().withMessage("Valid email is required"),
    body("phone")
      .notEmpty()
      .withMessage("Phone number is required")
      .isLength({ min: 10 })
      .withMessage("Phone number must be at least 10 digits"),
  ],
  validate,
  createClient,
);

// @route   PUT /api/clients/:id
// @desc    Update an existing client by ID
// Middleware ensures only valid fields are updated
router.put(
  "/:id",
  [
    body("name").optional().notEmpty().withMessage("Name cannot be empty"),
    body("email")
      .optional()
      .isEmail()
      .withMessage("If provided, must be a valid email"),
    body("phone")
      .optional()
      .isLength({ min: 10 })
      .withMessage("Phone number must be at least 10 digits"),
  ],
  validate,
  updateClient,
);

// @route   DELETE /api/clients/:id
// @desc    Delete a client by ID
router.delete("/:id", deleteClient);

// Export the router so server.js can mount it
module.exports = router;
