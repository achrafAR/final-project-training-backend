import HomeUi from "../models/homeUi.model.js";
import { v2 as cloudinary } from "cloudinary";



cloudinary.config({
    cloud_name: "didb7l6nz",
    api_key: "721724432988673",
    api_secret: "xhRyWzzuWWbgblhPRZ8cVk_Ss7Q",
});

//create a new HomeUi
const createHomeUi = async (req, res) => {
    const { title, description } = req.body;

    try {
        let image = req.files.map(file => file.path); //get the path of the image
        const uploadedImages = await Promise.all(image.map(image => cloudinary.uploader.upload(image))); // upload the images to cloudinary
        const newHomeUi = new HomeUi({
            image: uploadedImages.map(image => image.secure_url),
            title,
            description,
        });
        const savedHomeUi = await newHomeUi.save();
        res.status(201).json({
            message: "HomeUi Successfully created",
            data: savedHomeUi,
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({
            message: "Failed to create HomeUi",
        });
    }
};

//get a HomeUi
const getHomeUi = async (req, res) => {
    const allHomeUi = await HomeUi.find();
    res.json({
        message: "All HomeUi",
        status: 200,
        data: allHomeUi,
    });
};

//delete a HomeUi
const deleteHomeUi = async (req, res) => {
    const { id } = req.params;
    try {
        await HomeUi.findByIdAndRemove(id);
        res.status(200).json({
            message: "HomeUi Successfully deleted",
            data: null,
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({
            message: "Failed to delete HomeUi",
        });
    }
};

//update HomeUi
const updateHomeUi = async (req, res) => {
    const { id } = req.params;
    const { title, description } = req.body;
    try {
        const existingHomeUi = await HomeUi.findById(id);

        let newImages = existingHomeUi.image.slice(); // Make a copy of the existing image array

        if (req.files && req.files.length > 0) {
            const uploadedImages = await Promise.all(
                req.files.map((file) => cloudinary.uploader.upload(file.path))
            );
            uploadedImages.forEach((image, index) => {
                newImages[index] = image.secure_url; // Replace the URL of the updated image
            });
        }

        const updatedHomeUi = await HomeUi.findByIdAndUpdate(
            id,
            { title, description, image: newImages },
            { new: true }
        );
        res.json({
            message: "HomeUi updated successfully",
            status: 200,
            data: updatedHomeUi,
        });
    } catch (error) {
        console.log(error);
        res.json({
            message: "HomeUi update failed",
            status: 203,
        });
    }
};


export default {
    createHomeUi,
    getHomeUi,
    deleteHomeUi,
    updateHomeUi
};
