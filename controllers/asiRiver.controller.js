import AsiRiver from "../models/asiRiver.model.js";
import { v2 as cloudinary } from "cloudinary";



cloudinary.config({
    cloud_name: "didb7l6nz",
    api_key: "721724432988673",
    api_secret: "xhRyWzzuWWbgblhPRZ8cVk_Ss7Q",
});

//create a new AsiRiver
const createAsiRiver = async (req, res) => {
    const { title, description} = req.body;

    try {
        let image = req.files.map(file => file.path); //get the path of the image
        const uploadedImages = await Promise.all(image.map(image => cloudinary.uploader.upload(image))); // upload the images to cloudinary
        const newAsiRiver = new AsiRiver({
            image: uploadedImages.map(image => image.secure_url),
            title,
            description
        });
        const savedAsiRiver = await newAsiRiver.save();
        res.status(201).json({
            message: "AsiRiver Successfully created",
            data: savedAsiRiver,
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({
            message: "Failed to create AsiRiver",
        });
    }
};

//get a AsiRiver
const getAsiRiver = async (req, res) => {
    const allAsiRiver = await AsiRiver.find();
    res.json({
        message: "All AsiRiver",
        status: 200,
        data: allAsiRiver,
    });
};

//delete a AsiRiver
const deleteAsiRiver = async (req, res) => {
    const { id } = req.params;
    try {
        await AsiRiver.findByIdAndRemove(id);
        res.status(200).json({
            message: "AsiRiver Successfully deleted",
            data: null,
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({
            message: "Failed to delete AsiRiver",
        });
    }
};

//update AsiRiver
const updateAsiRiver = async (req, res) => {
    const { id } = req.params;
    const { title } = req.body;
    try {
        const existingAsiRiver = await AsiRiver.findById(id);

        let newImages = existingAsiRiver.image.slice(); // Make a copy of the existing image array

        if (req.files && req.files.length > 0) {
            const uploadedImages = await Promise.all(
                req.files.map((file) => cloudinary.uploader.upload(file.path))
            );
            uploadedImages.forEach((image, index) => {
                newImages[index] = image.secure_url; // Replace the URL of the updated image
            });
        }

        const updatedAsiRiver = await AsiRiver.findByIdAndUpdate(
            id,
            { title, description, image: newImages },
            { new: true }
        );
        res.json({
            message: "AsiRiver updated successfully",
            status: 200,
            data: updatedAsiRiver,
        });
    } catch (error) {
        console.log(error);
        res.json({
            message: "AsiRiver update failed",
            status: 203,
        });
    }
};


export default {
    createAsiRiver,
    getAsiRiver,
    deleteAsiRiver,
    updateAsiRiver
};
