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
const { createRole, deleteRole } = require("./controllers/roleController");
const { createUser, loginUser } = require("./controllers/userController");

const { isAuth } = require("./middlewares/isAuth");
const { isAdmin } = require("./middlewares/isAdmin");

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

app.use(cors());
// app.use(
//   cors({
//     origin: "https://ua-furnit.vercel.app",
//     credentials: true,
//     allowedHeaders:
//       "X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version",
//     methods: "GET,OPTIONS,PATCH,DELETE,POST,PUT",
//   })
// );

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(
  express.static(__dirname, {
    extensions: ["js"],
    type: "application/javascript",
  })
);

//category
app.post("/api/category", isAuth, isAdmin, createCategory);
app.patch("/api/category/:id", isAuth, isAdmin, updateCategory);
app.delete("/api/category/:id", isAuth, isAdmin, deleteCategory);
app.get("/api/category", getAllCategories);
app.get("/api/category/:id", getCategory);

//furniture
app.post("/api/furniture", isAuth, isAdmin, createFurniture);
app.patch("/api/furniture/:id", isAuth, isAdmin, updateFurniture);
app.delete("/api/furniture/:id", isAuth, isAdmin, deleteFurniture);
app.get("/api/furniture", getAllFurniture);
app.get("/api/furniture/:id", getFurniture);
app.get("/api/furniture/category/:value", getFurnitureByValue);

//question
app.post("/api/question/", isAuth, isAdmin, createQuestion);
app.delete("/api/question/:id", isAuth, isAdmin, deleteQuestion);
app.get("/api/question/", getAllQuestions);
app.get("/api/question/find/:find", getQuestionsBySimilarWord);

//role
app.post("/api/role/", isAuth, isAdmin, createRole);
app.delete("/api/role/:id", isAuth, isAdmin, deleteRole);

//user
app.post("/register/", createUser);
app.post("/login/", loginUser);

app.listen(process.env.PORT, () => {
  console.log(`Server running on port ${process.env.PORT}`);
});
