import AboutUsDescription from "../models/aboutUsDescription.model.js";
import { v2 as cloudinary } from "cloudinary";



cloudinary.config({
    cloud_name: "didb7l6nz",
    api_key: "721724432988673",
    api_secret: "xhRyWzzuWWbgblhPRZ8cVk_Ss7Q",
});

//create a new AboutUsDescription
const createAboutUsDescription = async (req, res) => {
    const { title, description } = req.body;
    try {
        let image = req.file.path; //get the path of the image
        const uploadedImage = await cloudinary.uploader.upload(image); // upload the image to cloudinary
        const newAboutUsDescription = new AboutUsDescription({
            image: uploadedImage.secure_url,
            title,
            description,
        });
        const savedAboutUsDescription = await newAboutUsDescription.save();
        res.status(201).json({
            message: "AboutUsDescription Successfully created",
            data: savedAboutUsDescription,
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({
            message: "Failed to create AboutUsDescription",
        });
    }
};

//get a AboutUsDescription
const getAboutUsDescription = async (req, res) => {
    const allAboutUsDescription = await AboutUsDescription.find();
    res.json({
        message: "All AboutUsDescription",
        status: 200,
        data: allAboutUsDescription,
    });
};

//delete a AboutUsDescription
const deleteAboutUsDescription = async (req, res) => {
    const { id } = req.params;
    try {
        await AboutUsDescription.findByIdAndRemove(id);
        res.status(200).json({
            message: "AboutUsDescription Successfully deleted",
            data: null,
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({
            message: "Failed to delete AboutUsDescription",
        });
    }
};

//update AboutUsDescription
const updateAboutUsDescription = async (req, res) => {
    const { id } = req.params;
    const { title, description } = req.body;
    try {
        let image;
        if (req.file) {
            image = await req.file.path;
            const uploadedImage = await cloudinary.uploader.upload(image);
            image = uploadedImage.secure_url;
        }
        const editAboutUsDescription = {
            image,
            title,
            description,
        };
        const updatedAboutUsDescription = await AboutUsDescription.findByIdAndUpdate(id, editAboutUsDescription);
        res.json({
            message: "AboutUsDescription updated successfully",
            status: 200,
            data: editAboutUsDescription,
        });
    } catch (error) {
        console.log(error);
        res.json({
            message: "AboutUsDescription updated failed",
            status: 203,
        });
    }
};


export default {
    createAboutUsDescription,
    getAboutUsDescription,
    deleteAboutUsDescription,
    updateAboutUsDescription
};
