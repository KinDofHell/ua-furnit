const { validationResult, body } = require("express-validator");
const { Role } = require("../models/exports");

const validateRole = [
  body("name").notEmpty().trim().withMessage("Name is required!"),
];

exports.createRole = async (req, res) => {
  await Promise.all(validateRole.map((validation) => validation.run(req)));

  const errors = validationResult(req);

  if (!errors.isEmpty())
    return res
      .status(400)
      .json({ errors: errors.array({ onlyFirstError: true }) });

  try {
    const role = await Role.create(req.body);
    res.status(201).json(role);
  } catch (err) {
    res.status(500).json(err);
  }
};

exports.deleteRole = async (req, res) => {
  try {
    const deletedRole = await Role.findByIdAndDelete(req.params.id);
    if (!deletedRole) return res.status(404).json({ error: "Role not found!" });
    res.json(deletedRole);
  } catch (error) {
    console.error("Error deleting role:", error);
    res.status(500).json({ error: "Error deleting role!" });
  }
};
