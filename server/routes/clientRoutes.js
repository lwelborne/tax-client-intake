const express = require("express");
const { body, validationResult } = require("express-validator");
const {
  getClients,
  getClientById,
  createClient,
  updateClient,
  deleteClient,
} = require("../Controllers/clientController");

const router = express.Router();

const validate = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  next();
};

router.get("/", getClients);

router.get("/:id", getClientById);

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

router.delete("/:id", deleteClient);

module.exports = router;
