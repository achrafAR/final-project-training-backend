import Opening from "../models/opening.model.js";
import { v2 as cloudinary } from "cloudinary";



cloudinary.config({
    cloud_name: "didb7l6nz",
    api_key: "721724432988673",
    api_secret: "xhRyWzzuWWbgblhPRZ8cVk_Ss7Q",
});

//create a new Opening
const createOpening = async (req, res) => {
    const { title, openingDate } = req.body;

    try {
        let image = req.files.map(file => file.path); //get the path of the image
        const uploadedImages = await Promise.all(image.map(image => cloudinary.uploader.upload(image))); // upload the images to cloudinary
        const newOpening = new Opening({
            image: uploadedImages.map(image => image.secure_url),
            title,
            openingDate,
        });
        const savedOpening = await newOpening.save();
        res.status(201).json({
            message: "Opening Successfully created",
            data: savedOpening,
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({
            message: "Failed to create Opening",
        });
    }
};

//get a Opening
const getOpening = async (req, res) => {
    const allOpening = await Opening.find();
    res.json({
        message: "All Opening",
        status: 200,
        data: allOpening,
    });
};

//delete a Opening
const deleteOpening = async (req, res) => {
    const { id } = req.params;
    try {
        await Opening.findByIdAndRemove(id);
        res.status(200).json({
            message: "Opening Successfully deleted",
            data: null,
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({
            message: "Failed to delete Opening",
        });
    }
};

//update Opening
const updateOpening = async (req, res) => {
    const { id } = req.params;
    const { title, openingDate } = req.body;
    try {
        const existingOpening = await Opening.findById(id);

        let newImages = existingOpening.image.slice(); // Make a copy of the existing image array

        if (req.files && req.files.length > 0) {
            const uploadedImages = await Promise.all(
                req.files.map((file) => cloudinary.uploader.upload(file.path))
            );
            uploadedImages.forEach((image, index) => {
                newImages[index] = image.secure_url; // Replace the URL of the updated image
            });
        }

        const updatedOpening = await Opening.findByIdAndUpdate(
            id,
            { title, openingDate, image: newImages },
            { new: true }
        );
        res.json({
            message: "Opening updated successfully",
            status: 200,
            data: updatedOpening,
        });
    } catch (error) {
        console.log(error);
        res.json({
            message: "Opening update failed",
            status: 203,
        });
    }
};


export default {
    createOpening,
    getOpening,
    deleteOpening,
    updateOpening
};
