const mongoose = require("mongoose");

const bookingSchema = new mongoose.Schema({
    userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    flightId: { type: mongoose.Schema.Types.ObjectId, ref: "Flight", required: true },
    seatNumber: String,
    bookingDate: { type: Date, default: Date.now }
});

module.exports = mongoose.model("Booking", bookingSchema);
