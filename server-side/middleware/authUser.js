const User = require("../models/userModel.js");

const verifyUser = async (req, res, next) => {
  if (!req.session.userId) {
    return res.status(401).json({ msg: "Please login to your account" });
  }
  const user = await User.findOne({
    where: {
      id: req.session.userId,
    },
  });
  if (!user)
    return res.status(404).json({ msg: "User not found, Please try again" });
  req.userId = user.id;
  req.email = user.email;
  req.roleId = user.role_id;
  req.userUUID = user.uuid;
  next();
};

const adminOnly = async (req, res, next) => {
  const user = await User.findOne({
    where: {
      id: req.session.userId,
    },
  });
  if (!user)
    return res.status(404).json({ msg: "User not found, Please try again" });
  if (user.role_id < 1)
    return res.status(403).json({ msg: "Unauthorized Access : Admin Only" });
  next();
};

module.exports = { verifyUser, adminOnly};
