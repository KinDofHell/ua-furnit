const { validationResult, body } = require("express-validator");
const { Furniture, Category } = require("../models/exports");

const cloudinary = require("cloudinary").v2;
const formidable = require("formidable");
const imageType = require("image-type");

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.API,
  api_secret: process.env.API_SECRET,
});

const formParser = async (req) => {
  try {
    const imagesData = [];
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

        if (fields.images) {
          if (Array.isArray(fields.images)) {
            fields.images.forEach((image) => {
              console.log("Image data: " + image);
              imagesData.push(image);
            });
          } else {
            console.log("Image data: " + fields.images);
            imagesData.push(fields.images);
          }
        }

        resolve();
      });
    });

    return [imagesData, category];
  } catch (err) {
    console.log(err);
  }
};

const uploadCloudinary = async (images) => {
  const resultArr = [];

  try {
    for (const image of images) {
      const imageBuffer = Buffer.from(image, "base64");
      const format = imageType(imageBuffer)?.ext;
      if (!format) {
        throw new Error("Invalid image format");
      }
      const dataUrl = `data:image/jpeg;base64,${image}`;
      const result = await cloudinary.uploader.upload(dataUrl, {
        folder: "furniture",
      });
      resultArr.push(result.public_id);
      console.log("Result in cloudUpload:", resultArr);
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

exports.getFurnitureByValue = async (req, res) => {
  try {
    const { value } = req.params;
    const category = await Category.findOne({ value });
    if (category) {
      const furniture = await Furniture.find({
        category: category._id,
      });
      if (!furniture) {
        res.status(404).json({ error: "Furniture not found" });
      } else {
        res.json(furniture);
      }
    } else {
      res.status(404).json({ error: "Category not found" });
    }
  } catch (error) {
    console.error("Error finding furniture:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};
