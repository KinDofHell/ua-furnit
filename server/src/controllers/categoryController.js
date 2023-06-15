const { validationResult, body } = require("express-validator");
const { Category } = require("../models/exports");

const validateCategory = [
  body("name").notEmpty().trim().withMessage("Name is required!"),
  body("value").notEmpty().trim().withMessage("Value is required!"),
];

exports.createCategory = async (req, res) => {
  await Promise.all(validateCategory.map((validation) => validation.run(req)));

  const errors = validationResult(req);

  if (!errors.isEmpty())
    return res
      .status(400)
      .json({ errors: errors.array({ onlyFirstError: true }) });

  try {
    const category = await Category.create(req.body);
    res.status(201).json(category);
  } catch (err) {
    res.status(500).json(err);
  }
};

exports.updateCategory = async (req, res) => {
  await Promise.all(validateCategory.map((validation) => validation.run(req)));

  const errors = validationResult(req);

  if (!errors.isEmpty())
    return res
      .status(400)
      .json({ errors: errors.array({ onlyFirstError: true }) });

  try {
    const updatedCategory = await Category.findByIdAndUpdate(
      req.params.id,
      req.body,
      {
        new: true,
      }
    );
    if (!updatedCategory)
      return res.status(404).json({ error: "Category not found!" });
    res.json(updatedCategory);
  } catch (error) {
    console.error("Error updating category:", error);
    res.status(500).json({ error: "Error updating category!" });
  }
};

exports.deleteCategory = async (req, res) => {
  try {
    const deletedCategory = await Category.findByIdAndDelete(req.params.id);
    if (!deletedCategory)
      return res.status(404).json({ error: "Category not found!" });
    res.json(deletedCategory);
  } catch (error) {
    console.error("Error deleting category:", error);
    res.status(500).json({ error: "Error deleting category!" });
  }
};

exports.getAllCategories = async (req, res) => {
  try {
    const categories = await Category.find();
    res.json(categories);
  } catch (error) {
    console.error("Error: ", error);
    res.status(500).json({ error: "Error retrieving categories!" });
  }
};

exports.getCategory = async (req, res) => {
  try {
    const category = await Category.findById(req.params.id);
    if (!category)
      return res.status(404).json({ error: "Category not found!" });
    res.json(category);
  } catch (error) {
    console.error("Error: ", error);
    res.status(500).json({ error: "Error retrieving category!" });
  }
};
