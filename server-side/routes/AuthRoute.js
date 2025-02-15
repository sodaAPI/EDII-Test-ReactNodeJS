const { Login, logOut, Me } = require("../controllers/Auth.js");
const express = require("express");
const { verifyUser } = require("../middleware/authUser.js");
const router = express.Router();
const cors = require("cors");

const corsOptions = {
  origin: "http://localhost:5173", // Specify the exact origin of your frontend application
  credentials: true, // Allow requests with credentials
};

// Enable CORS with the specified options
router.use(cors(corsOptions));
router.get("/me", Me);
router.post("/login", Login);
router.delete("/logout", verifyUser, logOut);

module.exports = router;
