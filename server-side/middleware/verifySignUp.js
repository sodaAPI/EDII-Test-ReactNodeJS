const User = require("../models/userModel.js");

const checkDuplicateUsernameOrEmail = async (req, res, next) => {
  try {
    // Check for duplicate email
    const existingEmail = await User.findOne({
      where: {
        email: req.body.email,
      },
    });

    if (existingEmail) {
      return res.status(400).json({
        success: false,
        msg: "Email is already in use. Please use a different email address.",
      });
    }

    next(); // Proceed to the next middleware if no duplicates found
  } catch (error) {
    res.status(500).json({
      success: false,
      msg: "Internal server error. Please try again later.",
    });
  }
};

const verifySignUp = {
  checkDuplicateUsernameOrEmail: checkDuplicateUsernameOrEmail,
};

module.exports = verifySignUp;
