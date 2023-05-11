import Offers from "../models/offers.model.js";
import { v2 as cloudinary } from "cloudinary";

cloudinary.config({
    cloud_name: "didb7l6nz",
    api_key: "721724432988673",
    api_secret: "xhRyWzzuWWbgblhPRZ8cVk_Ss7Q",
});

//create a new Offers
const createOffers = async (req, res) => {
    const { title, description, price, capacity, quantity, reserve } = req.body;
    try {
        let image = req.files.map((file) => file.path); //get the path of the image
        const uploadedImages = await Promise.all(
            image.map((image) => cloudinary.uploader.upload(image))
        ); // upload the images to cloudinary
        const newOffers = new Offers({
            image: uploadedImages.map((image) => image.secure_url),
            title,
            description,
            price,
            capacity,
            quantity,
            reserve,
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
    const { title, description, price, capacity, quantity, reserve } = req.body;
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

        const editOffers = {
            image: newImages,
            title,
            description,
            price,
            capacity,
            quantity,
            reserve,
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
    updateOffers,
};
