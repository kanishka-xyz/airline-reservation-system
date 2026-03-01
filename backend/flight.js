const mongoose = require("mongoose");

const flightSchema = new mongoose.Schema({
    airline: String,
    flightNo: String,
    source: String,
    destination: String,
    dateOfFlight: Date,
    price: Number,
    depTime:Number,
    duration:Number,
    totalStops:Number,
    additionalInfo:String
});

const Flight = mongoose.model("Flight", flightSchema);
module.exports = Flight
