
const express = require("express");
const mongoose = require("mongoose");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
require("dotenv").config();
const cors = require("cors");
const morgan = require("morgan");

const app = express();

// Middleware
app.use(express.json());
app.use(cors());
app.use(morgan("dev"));

// Connect to MongoDB with improved error handling
mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log("Auth Service MongoDB Connected"))
  .catch(err => {
    console.error("MongoDB Connection Error:", err);
    process.exit(1); // Exit with error code to let Docker restart if configured
  });

// User Schema
const UserSchema = new mongoose.Schema({
  email: { 
    type: String, 
    required: true, 
    unique: true 
  },
  password: { 
    type: String, 
    required: true 
  },
  role: { 
    type: String, 
    enum: ["user", "admin", "validator"], 
    default: "user" 
  },
  createdAt: { 
    type: Date, 
    default: Date.now 
  }
});

// User Model
const User = mongoose.model("User", UserSchema);

// Routes
app.post("/api/auth/register", async (req, res) => {
  try {
    const { email, password, role } = req.body;
    
    // Check if user already exists
    let user = await User.findOne({ email });
    if (user) {
      return res.status(400).json({ msg: "User already exists" });
    }
    
    // Create new user
    user = new User({
      email,
      password,
      role: role || "user"
    });
    
    // Hash password
    const salt = await bcrypt.genSalt(10);
    user.password = await bcrypt.hash(password, salt);
    
    await user.save();
    
    // Create JWT
    const token = jwt.sign(
      { id: user.id, email: user.email, role: user.role },
      process.env.JWT_SECRET || "fallback_dev_secret", // Fallback only for development
      { expiresIn: "1d" }
    );
    
    res.json({ token });
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
});

app.post("/api/auth/login", async (req, res) => {
  try {
    const { email, password } = req.body;
    
    // Check if user exists
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ msg: "Invalid credentials" });
    }
    
    // Check password
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ msg: "Invalid credentials" });
    }
    
    // Create JWT
    const token = jwt.sign(
      { id: user.id, email: user.email, role: user.role },
      process.env.JWT_SECRET || "fallback_dev_secret", // Fallback only for development
      { expiresIn: "1d" }
    );
    
    res.json({ token });
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
});

// Verify token route
app.get("/api/auth/verify", async (req, res) => {
  try {
    const token = req.header("x-auth-token");
    
    if (!token) {
      return res.status(401).json({ msg: "No token, authorization denied" });
    }
    
    const decoded = jwt.verify(token, process.env.JWT_SECRET || "fallback_dev_secret");
    res.json(decoded);
  } catch (err) {
    res.status(401).json({ msg: "Token is not valid" });
  }
});

// Health check endpoint
app.get("/health", (req, res) => {
  res.status(200).json({ status: "ok" });
});

const PORT = process.env.PORT || 5001;
app.listen(PORT, () => console.log(`Auth Service running on port ${PORT}`));

// Handle termination signals properly
process.on('SIGTERM', () => {
  console.log('SIGTERM received, shutting down gracefully');
  process.exit(0);
});

process.on('SIGINT', () => {
  console.log('SIGINT received, shutting down gracefully');
  process.exit(0);
});
