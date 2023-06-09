import Offers from "../models/offers.model.js";
import { v2 as cloudinary } from "cloudinary";

cloudinary.config({
  cloud_name: "didb7l6nz",
  api_key: "721724432988673",
  api_secret: "xhRyWzzuWWbgblhPRZ8cVk_Ss7Q",
});

//create a new Offers
const createOffers = async (req, res) => {
  const { title, description, price, capacity, is_reserved, rating ,totalClick, totalRating } = req.body;
  try {
    let image;
        if (req.file) {
            image = await req.file.path;
            const uploadedImage = await cloudinary.uploader.upload(image);
            image = uploadedImage.secure_url;
        }

        const rating = totalClick>0? totalRating / totalClick :0;
    const newOffers = new Offers({
      image,
      title,
      description,
      price,
      capacity,
      is_reserved,
      totalClick,
      totalRating,
      rating
    });
    const savedOffers = await newOffers.save();
    res.status(201).json({
      message: "Offers Successfully created",
      data: savedOffers,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      message: "Failed to create Offers",
    });
  }
};

//get a Offers
const getOffers = async (req, res) => {
  const allOffers = await Offers.find();
  res.json({
    message: "All Offers",
    status: 200,
    data: allOffers,
  });
};

const getOffer = async (req, res) => {
  const { id } = req.params;
  const offer = await Offers.findById(id);
  res.json({
    data: offer,
    status: 200,
    message: "Offer",
  });
};

//delete a Offers
const deleteOffers = async (req, res) => {
  const { id } = req.params;
  try {
    await Offers.findByIdAndRemove(id);
    res.status(200).json({
      message: "Offers Successfully deleted",
      data: null,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      message: "Failed to delete Offers",
    });
  }
};

//update Offers
const updateOffers = async (req, res) => {
  const { id } = req.params;
  const { title, description, price, capacity,rating, is_reserved, totalRating,totalClick } = req.body;
  try {
    const existingOffer = await Offers.findById(id);

    let newImages = existingOffer.image.slice(); // Make a copy of the existing image array

    if (req.files && req.files.length > 0) {
      const uploadedImages = await Promise.all(
        req.files.map((file) => cloudinary.uploader.upload(file.path))
      );
      uploadedImages.forEach((image, index) => {
        newImages[index] = image.secure_url; // Replace the URL of the updated image
      });
    }

    const rating = totalClick > 0 ? totalRating / totalClick : 0;


    const editOffers = {
      image: newImages,
      title,
      description,
      price,
      capacity,
      is_reserved,
      rating,
      totalRating,
      totalClick,
    };
    const updatedOffers = await Offers.findByIdAndUpdate(id, editOffers);
    res.json({
      message: "Offers updated successfully",
      status: 200,
      data: editOffers,
    });
  } catch (error) {
    console.log(error);
    res.json({
      message: "Offers updated failed",
      status: 203,
    });
  }
};

export default {
  createOffers,
  getOffers,
  deleteOffers,
  getOffer,
  updateOffers,
};
