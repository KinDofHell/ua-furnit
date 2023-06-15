const express = require("express");
const app = express();
const mongoose = require("mongoose");
const cors = require("cors");
require("dotenv").config();

const {
  createCategory,
  updateCategory,
  getAllCategories,
  deleteCategory,
  getCategory,
} = require("./controllers/categoryController");
const {
  createFurniture,
  updateFurniture,
  deleteFurniture,
  getAllFurniture,
  getFurniture,
  getFurnitureByValue,
} = require("./controllers/furnitureController");
const {
  createQuestion,
  deleteQuestion,
  getAllQuestions,
  getQuestionsBySimilarWord,
} = require("./controllers/questionController");

mongoose
  .connect(process.env.MONGO_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("Connected to MongoDB");
  })
  .catch((error) => {
    console.error("Error connecting to MongoDB", error);
  });

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(
  express.static(__dirname, {
    extensions: ["js"],
    type: "application/javascript",
  })
);
app.use(
  cors({
    origin: "https://ua-furnit.vercel.app",
    credentials: true,
  })
);

//category
app.post("/api/category", createCategory);
app.patch("/api/category/:id", updateCategory);
app.delete("/api/category/:id", deleteCategory);
app.get("/api/category", getAllCategories);
app.get("/api/category/:id", getCategory);

//furniture
app.post("/api/furniture", createFurniture);
app.patch("/api/furniture/:id", updateFurniture);
app.delete("/api/furniture/:id", deleteFurniture);
app.get("/api/furniture", getAllFurniture);
app.get("/api/furniture/:id", getFurniture);
app.get("/api/furniture/category/:value", getFurnitureByValue);

//question
app.post("/api/question/", createQuestion);
app.delete("/api/question/:id", deleteQuestion);
app.get("/api/question/", getAllQuestions);
app.get("/api/question/find/:find", getQuestionsBySimilarWord);

app.listen(process.env.PORT, () => {
  console.log(`Server running on port ${process.env.PORT}`);
});
