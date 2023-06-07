const { validationResult, body } = require("express-validator");
const { Furniture } = require("../models/exports");

const validateFurniture = [
  body("category").notEmpty().withMessage("Category is required!"),
  body("coverImage").notEmpty().withMessage("Cover image is required!"),
  body("images")
    .isArray({ min: 1 })
    .withMessage("Images must be an array with at least one element")
    .custom((value) => {
      if (value.some((item) => typeof item !== "string")) {
        throw new Error("Images must be an array of strings");
      }
      return true;
    }),
];

exports.createFurniture = async (req, res) => {
  await Promise.all(validateFurniture.map((validator) => validator.run(req)));

  const errors = validationResult(req);

  if (!errors.isEmpty())
    return res.status(400).json({ errors: errors.array() });
  try {
    const furniture = await Furniture.create(req.body);
    res.status(201).json(furniture);
  } catch (err) {
    res.status(500).json(err);
  }
};

exports.updateFurniture = async (req, res) => {
  await Promise.all(validateFurniture.map((validator) => validator.run(req)));

  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  try {
    const updatedFurniture = await Furniture.findByIdAndUpdate(
      req.params.id,
      req.body,
      {
        new: true,
      }
    );
    if (!updatedFurniture)
      return res.status(404).json({ error: "Furniture not found!" });
    res.json(updatedFurniture);
  } catch (error) {
    console.error("Error updating furniture:", error);
    res.status(500).json({ error: "Error updating furniture!" });
  }
};

exports.deleteFurniture = async (req, res) => {
  try {
    const deletedFurniture = await Furniture.findByIdAndDelete(req.params.id);
    if (!deletedFurniture)
      return res.status(404).json({ error: "Furniture not found!" });
    res.json(deletedFurniture);
  } catch (error) {
    console.error("Error deleting furniture:", error);
    res.status(500).json({ error: "Error deleting furniture!" });
  }
};

exports.getAllFurniture = async (req, res) => {
  try {
    const furniture = await Furniture.find();
    res.json(furniture);
  } catch (error) {
    console.error("Error: ", error);
    res.status(500).json({ error: "Error retrieving furniture!" });
  }
};

exports.getFurniture = async (req, res) => {
  try {
    const furniture = await Furniture.findOneAndUpdate(
      { _id: req.params.id },
      { $inc: { rating: 1 } }
    ).populate("category");
    if (!furniture)
      return res.status(404).json({ error: "Furniture not found!" });
    res.json(furniture);
  } catch (error) {
    console.error("Error: ", error);
    res.status(500).json({ error: "Error retrieving furniture!" });
  }
};
