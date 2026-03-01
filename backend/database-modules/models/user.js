const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema({
    name: String,
    email: String,
    password: String, // Hashed
    phone: String,
    bookings: [{ type: mongoose.Schema.Types.ObjectId, ref: "Booking" }],
});

module.exports = mongoose.model("User", UserSchema);
