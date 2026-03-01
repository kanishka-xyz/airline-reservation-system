const mongoose = require("mongoose");

const PaymentSchema = new mongoose.Schema({
    bookingId: { type: mongoose.Schema.Types.ObjectId, ref: "Booking", required: true },
    amount: { type: Number, required: true },
    paymentMethod: { type: String, enum: ["credit card", "debit card", "UPI", "wallet"], required: true },
    status: { type: String, enum: ["success", "failed", "pending"], default: "pending" }
}, { timestamps: true });

module.exports = mongoose.model("Payment", PaymentSchema);
