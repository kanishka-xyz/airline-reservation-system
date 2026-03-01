const jwt = require("jsonwebtoken");

// Authenticate User
const authenticate = (req, res, next) => {
  const token = req.header("Authorization");
  if (!token) {
    return res.status(401).json({ error: "Access denied. No token provided." });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded;
    next();
  } catch (error) {
    res.status(401).json({ error: "Invalid token" });
  }
};

// Authorize Role
const authorize = (userTypes) => {
  return (req, res, next) => {
    if (!req.user || !userTypes.includes(req.user.userType)) {
      return res.status(403).json({ error: "Access denied" });
    }
    next();
  };
};

// Admin Authentication Middleware
const authenticateAdmin = (req, res, next) => {
  if (!req.user || req.user.userType !== "admin") {
    return res.status(403).json({ error: "Admin access only" });
  }
  next();
};

const verifyUser = (req,res,next) =>{
  const token = req.headers.authorization?.split(" ")[1];
  console.log("Token Recieved:",token)
  next()
}

module.exports = { authenticate, authorize, authenticateAdmin,verifyUser }; // ✅ Ensure Correct Export
