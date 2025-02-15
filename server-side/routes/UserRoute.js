const express = require("express");
const {
  registerUser,
  deleteUser,
  getAllUsers,
  updateUser,
  getSelfUserByID,
  createUser,
  getUserByUUID,
  createPekerjaan,
  createPelatihan,
  createPendidikan,
  updatePekerjaan,
  updatePelatihan,
  updatePendidikan,
} = require("../controllers/User.js");
const {
  checkDuplicateUsernameOrEmail,
} = require("../middleware/verifySignUp.js");
const rateLimit = require("express-rate-limit");

const router = express.Router();

const limiter = rateLimit({
  windowMs: 1 * 60 * 1000,
  max: 5,
  message: "Too many attempts, please try again later after 1 minute",
});

router.get("/", getAllUsers);
router.get("/me", getSelfUserByID);
router.get("/:uuid", getUserByUUID);
router.patch("/:uuid", updateUser);
router.post("/register",checkDuplicateUsernameOrEmail, registerUser);
router.post("/create", createUser);
router.delete("/:uuid", deleteUser);

router.post("/pekerjaan", createPekerjaan);
router.post("/pelatihan", createPelatihan);
router.post("/pendidikan", createPendidikan);

router.patch("/pekerjaan/:id", updatePekerjaan);
router.patch("/pelatihan/:id", updatePelatihan);
router.patch("/pendidikan/:id", updatePendidikan);

module.exports = router;
