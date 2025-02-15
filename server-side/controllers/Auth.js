const User = require("../models/userModel.js");
const PekerjaanModel = require("../models/pekerjaanModel.js");
const PelatihanModel = require("../models/pelatihanModel.js");
const PendidikanModel = require("../models/pendidikanModel.js");
const argon2 = require("argon2");
const rateLimit = require("express-rate-limit");

const loginLimiter = rateLimit({
  windowMs: 5 * 60 * 1000, // 5 minutes
  max: 5, // limit each IP to 5 login attempts per windowMs
  msg: "Too many login attempts from this IP, please try again later",
});

const Login = async (req, res) => {
  // Apply rate limiting
  loginLimiter(req, res, async () => {
    // Check if user is already logged in
    if (req.session.userId) {
      return res.status(400).json({ msg: "You are already logged in" });
    }
    const user = await User.findOne({
      where: {
        email: req.body.email,
      },
    });
    if (!user)
      return res.status(404).json({ msg: "User not found, Please try again" });
    const match = await argon2.verify(user.password, req.body.password);
    if (!match)
      return res.status(400).json({ msg: "Wrong Password, Please try again" });
    req.session.userId = user.id;
    // Return basic user data along with the message
    res.status(200).json({
      msg: "You've logged",
      user: {
        id: user.id,
        email: user.email,
        name: user.name,
        // include other fields as needed
      },
    });
  });
};


const Me = async (req, res) => {
  if (!req.session.userId) {
    return res.status(401).json({ msg: "Please login to your account" });
  }
  try {
    const user = await User.findOne({
      where: { id: req.session.userId },
      include: [
        { model: PekerjaanModel },
        { model: PelatihanModel },
        { model: PendidikanModel },
      ],
    });
    if (!user) {
      return res.status(404).json({ msg: "User not found, Please try again" });
    }

    res.status(200).json(user);
  } catch (error) {
    res.status(500).json({ msg: error.message });
  }
};

const logOut = (req, res) => {
  req.session.destroy((err) => {
    if (err)
      return res
        .status(400)
        .json({ msg: "You cannot logout, please contact the administrator" });
    res.status(200).json({ msg: "You've been logout" });
  });
};

module.exports = { Login, Me, logOut };
