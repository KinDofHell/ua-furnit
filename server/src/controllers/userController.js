const { validationResult, body } = require("express-validator");
const { User } = require("../models/exports");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const validateUser = [
  body("login").notEmpty().trim().withMessage("Login is required!"),
  body("password").notEmpty().trim().withMessage("Password is required!"),
];

exports.createUser = async (req, res) => {
  await Promise.all(validateUser.map((validation) => validation.run(req)));

  const errors = validationResult(req);

  if (!errors.isEmpty())
    return res
      .status(400)
      .json({ errors: errors.array({ onlyFirstError: true }) });

  try {
    const { login, password, role } = req.body;
    const existingUser = await User.findOne({ login });
    if (existingUser) {
      return res.status(400).json({
        message: "Login already exists, please choose a different login",
      });
    }

    const salt = await bcrypt.genSalt();
    const hash = await bcrypt.hash(password, salt);
    const user = await User.create({
      login,
      password: hash,
      role,
    });
    res.status(201).json(user);
  } catch (err) {
    res.status(500).json(err);
  }
};

exports.deleteUser = async (req, res) => {
  try {
    const deletedUser = await User.findByIdAndDelete(req.params.id);
    if (!deletedUser) return res.status(404).json({ error: "User not found!" });
    res.json(deletedUser);
  } catch (error) {
    console.error("Error deleting user:", error);
    res.status(500).json({ error: "Error deleting user!" });
  }
};

exports.loginUser = async (req, res) => {
  const { login, password } = req.body;

  try {
    const user = await User.findOne({ login });

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    bcrypt.compare(password, user.password, (err, result) => {
      if (err || !result) {
        return res.status(401).json({ message: "Authentication failed" });
      }

      const token = jwt.sign({ id: user.id, role: user.role }, "secret_key", {
        expiresIn: "5d",
      });
      res.json(token);
    });
  } catch (err) {
    res.status(500).json({ message: "Internal server error" });
  }
};
