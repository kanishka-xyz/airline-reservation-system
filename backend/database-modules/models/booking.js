const mongoose = require("mongoose");

const BookingSchema = new mongoose.Schema({
    userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    flightId: { type: mongoose.Schema.Types.ObjectId, ref: "Flight", required: true },
    seatNumber: { type: String, required: true },
    status: { type: String, enum: ["confirmed", "pending", "cancelled"], default: "pending" }
}, { timestamps: true });

module.exports = mongoose.model("Booking", BookingSchema);
