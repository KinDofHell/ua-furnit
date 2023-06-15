const { validationResult, body } = require("express-validator");
const { Question } = require("../models/exports");

const validateQuestion = [
  body("question").notEmpty().trim().withMessage("Question is required!"),
  body("answer").notEmpty().trim().withMessage("Answer is required!"),
];

exports.createQuestion = async (req, res) => {
  await Promise.all(validateQuestion.map((validation) => validation.run(req)));

  const errors = validationResult(req);

  if (!errors.isEmpty())
    return res
      .status(400)
      .json({ errors: errors.array({ onlyFirstError: true }) });

  try {
    const category = await Question.create(req.body);
    res.status(201).json(category);
  } catch (err) {
    res.status(500).json(err);
  }
};

exports.deleteQuestion = async (req, res) => {
  try {
    const deletedQuestion = await Question.findByIdAndDelete(req.params.id);
    if (!deletedQuestion)
      return res.status(404).json({ error: "Question not found!" });
    res.json(deletedQuestion);
  } catch (error) {
    console.error("Error deleting question:", error);
    res.status(500).json({ error: "Error deleting question!" });
  }
};

exports.getAllQuestions = async (req, res) => {
  try {
    const questions = await Question.find();
    res.json(questions);
  } catch (error) {
    console.error("Error: ", error);
    res.status(500).json({ error: "Error retrieving questions!" });
  }
};

exports.getQuestionsBySimilarWord = async (req, res) => {
  try {
    const { find } = req.params;

    const regexPattern = new RegExp(find, "i");
    const questions = await Question.find({
      question: { $regex: regexPattern },
    });
    res.json(questions);
  } catch (error) {
    console.error("Error finding questions:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};
