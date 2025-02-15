const User = require("../models/userModel.js");
const PekerjaanModel = require("../models/pekerjaanModel.js");
const PelatihanModel = require("../models/pelatihanModel.js");
const PendidikanModel = require("../models/pendidikanModel.js");
const argon2 = require("argon2");

// Create a new Pekerjaan record
exports.createPekerjaan = async (req, res) => {
  const { user_id, company, position, salary, year } = req.body;
  try {
    const newPekerjaan = await PekerjaanModel.create({
      user_id,
      company,
      position,
      salary,
      year,
    });
    res.status(201).json({
      msg: "Pekerjaan created successfully",
      pekerjaan: newPekerjaan,
    });
  } catch (error) {
    res.status(400).json({ msg: error.message });
  }
};

// Create a new Pelatihan record
exports.createPelatihan = async (req, res) => {
  const { user_id, name, certificate, year } = req.body;
  try {
    const newPelatihan = await PelatihanModel.create({
      user_id,
      name,
      certificate,
      year,
    });
    res.status(201).json({
      msg: "Pelatihan created successfully",
      pelatihan: newPelatihan,
    });
  } catch (error) {
    res.status(400).json({ msg: error.message });
  }
};

// Create a new Pendidikan record
exports.createPendidikan = async (req, res) => {
  const { user_id, education, name, major, year, gpa } = req.body;
  try {
    const newPendidikan = await PendidikanModel.create({
      user_id,
      education,
      name,
      major,
      year,
      gpa,
    });
    res.status(201).json({
      msg: "Pendidikan created successfully",
      pendidikan: newPendidikan,
    });
  } catch (error) {
    res.status(400).json({ msg: error.message });
  }
};

// Update Pekerjaan
exports.updatePekerjaan = async (req, res) => {
  try {
    const { id } = req.params; // record id for pekerjaan
    const pekerjaan = await PekerjaanModel.findOne({ where: { id } });
    if (!pekerjaan) {
      return res.status(404).json({ msg: "Pekerjaan not found" });
    }

    // Destructure the fields from req.body
    const { user_id, company, position, salary, year } = req.body;

    // Update the record (only update fields if provided; otherwise, keep current value)
    const updateValues = {
      user_id: user_id ?? pekerjaan.user_id,
      company: company ?? pekerjaan.company,
      position: position ?? pekerjaan.position,
      salary: salary ?? pekerjaan.salary,
      year: year ?? pekerjaan.year,
    };

    await PekerjaanModel.update(updateValues, { where: { id } });
    res.status(200).json({ msg: "Pekerjaan updated successfully" });
  } catch (error) {
    res.status(400).json({ msg: error.message });
  }
};

// Update Pelatihan
exports.updatePelatihan = async (req, res) => {
  try {
    const { id } = req.params; // record id for pelatihan
    const pelatihan = await PelatihanModel.findOne({ where: { id } });
    if (!pelatihan) {
      return res.status(404).json({ msg: "Pelatihan not found" });
    }

    // Destructure fields from req.body
    const { user_id, name, certificate, year } = req.body;

    const updateValues = {
      user_id: user_id ?? pelatihan.user_id,
      name: name ?? pelatihan.name,
      certificate: certificate ?? pelatihan.certificate,
      year: year ?? pelatihan.year,
    };

    await PelatihanModel.update(updateValues, { where: { id } });
    res.status(200).json({ msg: "Pelatihan updated successfully" });
  } catch (error) {
    res.status(400).json({ msg: error.message });
  }
};

// Update Pendidikan
exports.updatePendidikan = async (req, res) => {
  try {
    const { id } = req.params; // record id for pendidikan
    const pendidikan = await PendidikanModel.findOne({ where: { id } });
    if (!pendidikan) {
      return res.status(404).json({ msg: "Pendidikan not found" });
    }

    // Destructure fields from req.body
    const { user_id, education, name, major, year, gpa } = req.body;

    const updateValues = {
      user_id: user_id ?? pendidikan.user_id,
      education: education ?? pendidikan.education,
      name: name ?? pendidikan.name,
      major: major ?? pendidikan.major,
      year: year ?? pendidikan.year,
      gpa: gpa ?? pendidikan.gpa,
    };

    await PendidikanModel.update(updateValues, { where: { id } });
    res.status(200).json({ msg: "Pendidikan updated successfully" });
  } catch (error) {
    res.status(400).json({ msg: error.message });
  }
};

exports.getUserByUUID = async (req, res) => {
  try {
    // Retrieve the target user by UUID, including associated models
    const targetUser = await User.findOne({
      where: { uuid: req.params.uuid },
      include: [
        { model: PekerjaanModel },
        { model: PelatihanModel },
        { model: PendidikanModel }
      ]
    });

    if (!targetUser) {
      return res.status(404).json({ msg: "User not found" });
    }

    res.status(200).json(targetUser);
  } catch (error) {
    res.status(400).json({ msg: error.message });
  }
};

exports.createUser = async (req, res) => {
  const {
    email,
    password,
    confirmpassword,
    name,
    position,
    ktp,
    birth_place,
    gender,
    religion,
    bloodtype,
    status,
    ktp_address,
    address,
    phone,
    close_phone,
    education_id,
    training_id,
    job_id,
    skill,
    willing_to_placed,
    salary,
    date_of_birth,
  } = req.body;

  // Validate password confirmation
  if (password !== confirmpassword) {
    return res.status(400).json({
      msg: "Password and Confirmation Password do not match, Please try again.",
    });
  }

  try {
    const hashPassword = await argon2.hash(password);
    // Create user with full user model fields
    const newUser = await User.create({
      email,
      password: hashPassword,
      name,
      role_id: "1",
      position,
      ktp,
      birth_place,
      gender,
      religion,
      bloodtype,
      status,
      ktp_address,
      address,
      phone,
      close_phone,
      education_id,
      training_id,
      job_id,
      skill,
      willing_to_placed,
      salary,
      date_of_birth,
    });
    res.status(201).json({ msg: "User created successfully", user: newUser });
  } catch (error) {
    res.status(400).json({ msg: error.message });
  }
};


exports.getAllUsers = async (req, res) => {
  try {
    const users = await User.findAll({
      include: [
        { model: PekerjaanModel },
        { model: PelatihanModel },
        { model: PendidikanModel },
      ],
    });
    res.json(users);
  } catch (error) {
    res.json({ message: error.message });
  }
};

exports.registerUser = async (req, res) => {
  const { email, password, passwordConfirm } = req.body;
  const hashPassword = await argon2.hash(password);
  if (password !== passwordConfirm) {
    return res.status(400).json({
      msg: "Password and Confirmation Password do not match, Please try again.",
    });
  }
  try {
    await User.create({
      email: email,
      password: hashPassword,
    });
    res.status(201).json({ msg: "Register Successfully" });
  } catch (error) {
    res.status(400).json({ msg: error.message });
  }
};

exports.deleteUser = async (req, res) => {
  const user = await User.findOne({
    where: {
      uuid: req.params.uuid,
    },
  });
  if (!user) return res.status(404).json({ msg: "User not found" });

  try {
    await User.destroy({
      where: {
        uuid: user.uuid,
      },
    });
    res.status(200).json({ msg: "User Deleted Successfully" });
  } catch (error) {
    res.status(400).json({ msg: error.message });
  }
};

exports.getSelfUserByID = async (req, res) => {
  try {
    if (!req.session.userId) {
      return res.status(404).json({ msg: "You've not logged" });
    }
    const user = await User.findOne({
      where: { id: req.session.userId },
      include: [
        { model: PekerjaanModel },
        { model: PelatihanModel },
        { model: PendidikanModel },
      ],
    });
    res.json(user);
  } catch (error) {
    res.json({ message: error.message });
  }
};

exports.updateUser = async (req, res) => {
  try {
    // Fetch the target user by UUID from the request parameters
    const targetUser = await User.findOne({
      where: { uuid: req.params.uuid },
    });
    if (!targetUser) {
      return res.status(404).json({ msg: "User not found" });
    }
    // Destructure fields from the request body that match your user model
    const {
      name,
      position,
      ktp,
      birth_place,
      gender,
      religion,
      bloodtype,
      status,
      ktp_address,
      address,
      phone,
      close_phone,
      education_id,
      training_id,
      job_id,
      skill,
      willing_to_placed,
      salary,
      email,
      password,
      confirmpassword,
      date_of_birth,
      role_id,
    } = req.body;

    // Handle password update: if provided, ensure confirmation matches and hash it.
    let hashPassword = targetUser.password;
    if (password) {
      if (password !== confirmpassword) {
        return res.status(400).json({
          msg: "Password and Confirmation Password do not match, Please try again.",
        });
      }
      hashPassword = await argon2.hash(password);
    }

    // Build the update object with provided fields or fallback to existing values.
    const updateValues = {
      name: name && name !== "" ? name : targetUser.name,
      position: position && position !== "" ? position : targetUser.position,
      ktp: ktp && ktp !== "" ? ktp : targetUser.ktp,
      birth_place:
        birth_place && birth_place !== "" ? birth_place : targetUser.birth_place,
      gender: gender && gender !== "" ? gender : targetUser.gender,
      religion: religion && religion !== "" ? religion : targetUser.religion,
      bloodtype:
        bloodtype && bloodtype !== "" ? bloodtype : targetUser.bloodtype,
      status: status && status !== "" ? status : targetUser.status,
      ktp_address:
        ktp_address && ktp_address !== "" ? ktp_address : targetUser.ktp_address,
      address: address && address !== "" ? address : targetUser.address,
      phone: phone && phone !== "" ? phone : targetUser.phone,
      close_phone:
        close_phone && close_phone !== "" ? close_phone : targetUser.close_phone,
      education_id:
        education_id && education_id !== "" ? education_id : targetUser.education_id,
      training_id:
        training_id && training_id !== "" ? training_id : targetUser.training_id,
      job_id: job_id && job_id !== "" ? job_id : targetUser.job_id,
      skill: skill && skill !== "" ? skill : targetUser.skill,
      willing_to_placed:
        willing_to_placed && willing_to_placed !== ""
          ? willing_to_placed
          : targetUser.willing_to_placed,
      salary: salary && salary !== "" ? salary : targetUser.salary,
      email: email && email !== "" ? email : targetUser.email,
      date_of_birth:
        date_of_birth && date_of_birth !== ""
          ? date_of_birth
          : targetUser.date_of_birth,
      role_id: role_id && role_id !== "" ? role_id : targetUser.role_id,
      password: hashPassword,
    };

    // Remove keys with undefined values
    Object.keys(updateValues).forEach(
      (key) => updateValues[key] === undefined && delete updateValues[key]
    );

    // Perform the update
    await User.update(updateValues, {
      where: { uuid: targetUser.uuid },
    });

    res.status(200).json({ msg: "User Updated" });
  } catch (error) {
    res.status(400).json({ msg: error.message });
  }
};
