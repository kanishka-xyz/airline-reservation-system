const express = require("express");
const { authenticate, authenticateAdmin, authorize,verifyUser } = require("./middleware");
const Flight = require("./flight"); // ✅ Import Flight Model

const router = express.Router();

// 📌 1. Get All Flights
router.get("/flights", authenticate, authenticateAdmin,authorize, async (req, res) => {
    try {
        const flights = await Flight.find();
        res.status(200).json(flights);
    } catch (error) {
        res.status(500).json({ error: "Server error" });
    }
});

// 📌 2. Add a New Flight
router.post("/flights", authenticate, authenticateAdmin,authorize, async (req, res) => {
    try {
        const newFlight = new Flight(req.body);
        await newFlight.save();
        res.status(201).json(newFlight);
    } catch (error) {
        res.status(500).json({ error: "Server error" });
    }
});

// 📌 3. Update Flight Details
router.put("/flights/:id", authenticate, authenticateAdmin,authorize, async (req, res) => {
    try {
        const updatedFlight = await Flight.findByIdAndUpdate(req.params.id, req.body, { new: true });
        res.status(200).json(updatedFlight);
    } catch (error) {
        res.status(500).json({ error: "Server error" });
    }
});

// 📌 4. Delete a Flight
router.delete("/flights/:id", authenticate, authenticateAdmin,authorize, async (req, res) => {
    try {
        await Flight.findByIdAndDelete(req.params.id);
        res.status(200).json({ message: "Flight deleted successfully" });
    } catch (error) {
        res.status(500).json({ error: "Server error" });
    }
});



module.exports = router;
