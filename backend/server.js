require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const authRoutes = require("./authroutes");
const csv = require("csvtojson")
const flightRoutes = require("./flightroutes")


const app = express();
app.use(express.json()); // Middleware to parse JSON
app.use(cors()); // Enable CORS for frontend requests


const adminRoutes = require("./admin");


app.use("/api/admin", adminRoutes);
app.use("/api/flight", flightRoutes); // Register flight routes

// Connect to MongoDB
mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log("MongoDB connected"))
  .catch(err => console.error(err));

// User Model
const User = mongoose.model("User", new mongoose.Schema({
  name: String,
  email: { type: String, unique: true },
  password: String,
  phone: String,
  passport: String,
  userType: String
}));

// Register Route
app.post("/api/register", async (req, res) => {
  try {
    const { name, email, password, phone, passport,userType } = req.body;
    if (!name || !email || !password || !phone || !passport ||!userType) {
      return res.status(400).json({ error: "All fields are required" });
    }

    const userExists = await User.findOne({ email });
    if (userExists) {
      return res.status(400).json({ error: "Email already registered" });
    }

    
    if (!["client", "admin"].includes(userType)) {
      return res.status(400).json({ error: "Invalid role" });
    }

    const hashedPassword = await bcrypt.hash(password, 10); // Hash password
    const newUser = new User({ name, email, password: hashedPassword, phone, passport,userType });
    await newUser.save();

    res.status(201).json({ message: "User registered successfully" });
  } catch (error) {
    res.status(500).json({ error: "Server error" });
  }
});
//authentication route
app.use("/api", authRoutes);

const CSV_FILE_PATH = "./flights.csv";//path to dataset

app.get("/api/flights", async (req, res) => {
  try {
    const jsonArray = await csv().fromFile(CSV_FILE_PATH);
    res.json(jsonArray);
  } catch (error) {
    console.error("Error reading CSV:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

// Login Route
app.post("/api/login", async (req, res) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      return res.status(400).json({ error: "Email and password are required" });
    }

    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ error: "Invalid email or password" });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ error: "Invalid email or password" });
    }

    const token = jwt.sign({ userId: user._id, userType: user.userType}, process.env.JWT_SECRET, { expiresIn: "1h" });
    console.log(token);
    res.status(200).json({ token, userId: user._id, name: user.name ,userType: user.userType});
  } catch (error) {
    console.log(error.message)
    res.status(500).json({ error: "Server error" });
  }
});


// Start Server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
