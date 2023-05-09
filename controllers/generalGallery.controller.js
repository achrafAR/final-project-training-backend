import GeneralGallery from "../models/generalGallery.model.js";
import { v2 as cloudinary } from "cloudinary";



cloudinary.config({
    cloud_name: "didb7l6nz",
    api_key: "721724432988673",
    api_secret: "xhRyWzzuWWbgblhPRZ8cVk_Ss7Q",
});

//create a new GeneralGallery
const createGeneralGallery = async (req, res) => {
    const { title } = req.body;

    try {
        let image = req.files.map(file => file.path); //get the path of the image
        const uploadedImages = await Promise.all(image.map(image => cloudinary.uploader.upload(image))); // upload the images to cloudinary
        const newGeneralGallery = new GeneralGallery({
            image: uploadedImages.map(image => image.secure_url),
            title,
        });
        const savedGeneralGallery = await newGeneralGallery.save();
        res.status(201).json({
            message: "GeneralGallery Successfully created",
            data: savedGeneralGallery,
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({
            message: "Failed to create GeneralGallery",
        });
    }
};

//get a GeneralGallery
const getGeneralGallery = async (req, res) => {
    const allGeneralGallery = await GeneralGallery.find();
    res.json({
        message: "All GeneralGallery",
        status: 200,
        data: allGeneralGallery,
    });
};

//delete a GeneralGallery
const deleteGeneralGallery = async (req, res) => {
    const { id } = req.params;
    try {
        await GeneralGallery.findByIdAndRemove(id);
        res.status(200).json({
            message: "GeneralGallery Successfully deleted",
            data: null,
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({
            message: "Failed to delete GeneralGallery",
        });
    }
};

//update GeneralGallery
const updateGeneralGallery = async (req, res) => {
    const { id } = req.params;
    const { title } = req.body;
    try {
        const existingGeneralGallery = await GeneralGallery.findById(id);

        let newImages = existingGeneralGallery.image.slice(); // Make a copy of the existing image array

        if (req.files && req.files.length > 0) {
            const uploadedImages = await Promise.all(
                req.files.map((file) => cloudinary.uploader.upload(file.path))
            );
            uploadedImages.forEach((image, index) => {
                newImages[index] = image.secure_url; // Replace the URL of the updated image
            });
        }

        const updatedGeneralGallery = await GeneralGallery.findByIdAndUpdate(
            id,
            { title, image: newImages },
            { new: true }
        );
        res.json({
            message: "GeneralGallery updated successfully",
            status: 200,
            data: updatedGeneralGallery,
        });
    } catch (error) {
        console.log(error);
        res.json({
            message: "GeneralGallery update failed",
            status: 203,
        });
    }
};


export default {
    createGeneralGallery,
    getGeneralGallery,
    deleteGeneralGallery,
    updateGeneralGallery
};
