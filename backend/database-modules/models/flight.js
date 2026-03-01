const mongoose = require("mongoose");

const FlightSchema = new mongoose.Schema({
    flightNumber: { type: String, required: true, unique: true },
    airline: { type: String, required: true },
    source: { type: String, required: true },
    destination: { type: String, required: true },
    departureTime: { type: Date, required: true },
    arrivalTime: { type: Date, required: true },
    seatsAvailable: { type: Number, required: true },
    price: { type: Number, required: true }
}, { timestamps: true });

module.exports = mongoose.model("Flight", FlightSchema);
