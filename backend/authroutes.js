const express = require("express");
const { authenticate, authorize } = require("./middleware");

const router = express.Router();

router.get("/client/dashboard", authenticate, authorize(["client"]), (req, res) => {
  res.json({ message: "Welcome to the Client Dashboard!" });
});

router.get("/admin/dashboard", authenticate, authorize(["admin"]), (req, res) => {
  res.json({ message: "Welcome to the Admin Dashboard!" });
});

module.exports = router;
