const { validationResult, body } = require("express-validator");
const { Furniture } = require("../models/exports");

const cloudinary = require("cloudinary").v2;
const formidable = require("formidable");

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.API,
  api_secret: process.env.API_SECRET,
});

const formParser = async (req) => {
  try {
    const imagesPath = [];
    let category = "";
    const form = formidable({ multiples: true });

    await new Promise((resolve, reject) => {
      form.parse(req, (err, fields, files) => {
        if (err) {
          reject(err);
          return;
        }
        console.log("field: ", fields.category);
        category = fields.category;
        files.images.forEach((image) => {
          const path = image.filepath;
          console.log("Path in controller: " + path);
          imagesPath.push(path);
        });

        resolve();
      });
    });

    return [imagesPath, category];
  } catch (err) {
    console.log(err);
  }
};

const uploadCloudinary = async (images) => {
  const resultArr = [];

  console.log("Images in uploadCloudinary:" + images);
  try {
    for (const image of images) {
      console.log("Images in uploadCloudinary single:" + image);
      const result = await cloudinary.uploader.upload(image, {
        folder: "furniture",
      });
      resultArr.push(result.public_id);
      console.log("Result in cloudUpload:" + resultArr);
    }
    return resultArr;
  } catch (err) {
    console.log(err);
  }
};

exports.createFurniture = async (req, res) => {
  try {
    const [imagesPath, category] = await formParser(req);
    const imagesUrl = await Promise.all(await uploadCloudinary(imagesPath));
    console.log("Images Url: " + imagesUrl);
    if (imagesUrl.length > 0) {
      const coverImage = imagesUrl.shift();
      const furniture = await Furniture.create({
        category: category,
        coverImage: coverImage,
        images: imagesUrl,
      });
      res.status(201).json(furniture);
    }
  } catch (err) {
    res.status(500).json(err);
  }
};

exports.updateFurniture = async (req, res) => {
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

    const { coverImage, images } = deletedFurniture;

    await cloudinary.uploader.destroy(coverImage);
    for (const image of images) await cloudinary.uploader.destroy(image);

    res.json(deletedFurniture);
  } catch (error) {
    console.error("Error deleting furniture:", error);
    res.status(500).json({ error: "Error deleting furniture!" });
  }
};

exports.getAllFurniture = async (req, res) => {
  try {
    const furniture = await Furniture.find().sort({ $natural: -1 });
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
