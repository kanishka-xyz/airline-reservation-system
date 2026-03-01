const mongoose = require("mongoose");

const DelayPredictionSchema = new mongoose.Schema({
    flightId: { type: mongoose.Schema.Types.ObjectId, ref: "Flight", required: true },
    predictedDelay: { type: Number, required: true },  // Delay in minutes
    confidenceScore: { type: Number, required: true }  // AI Confidence in %
}, { timestamps: true });

module.exports = mongoose.model("DelayPrediction", DelayPredictionSchema);
