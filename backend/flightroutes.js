const express = require("express");
const Flight = require("./flight"); 

const router = express.Router();

// Get all flights
router.get("/getflights", async (req, res) => {
    try {
        const flights = await Flight.find().limit(10);
        res.status(200).json(flights);
    } catch (error) {
        res.status(500).json({ error: "Server error: Unable to fetch flights" });
    }
});

// Add a Flight
router.post("/postflights", async (req, res) => {
    try {
        console.log(req.body)
        const newFlight = new Flight(req.body);
        await newFlight.save();
        res.status(201).json(newFlight);
    } catch (error) {
        res.status(500).json({ error: "Server error: Unable to add flight" });
    }
});

// Update a Flight
router.put("/updateflights/:id", async (req, res) => {
    try {
        const updatedFlight = await Flight.findByIdAndUpdate(req.params.id, req.body, { new: true });
        res.status(200).json(updatedFlight);
    } catch (error) {
        res.status(500).json({ error: "Server error: Unable to update flight" });
    }
});

// Delete a Flight
router.delete("/deleteflights/:id", async (req, res) => {
    try {
        await Flight.findByIdAndDelete(req.params.id);
        res.status(200).json({ message: "Flight deleted successfully" });
    } catch (error) {
        res.status(500).json({ error: "Server error: Unable to delete flight" });
    }
});

module.exports = router;
