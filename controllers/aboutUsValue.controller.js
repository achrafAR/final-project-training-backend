import AboutUsValue from "../models/aboutUsValue.model.js";
import { v2 as cloudinary } from "cloudinary";



cloudinary.config({
    cloud_name: "didb7l6nz",
    api_key: "721724432988673",
    api_secret: "xhRyWzzuWWbgblhPRZ8cVk_Ss7Q",
});

//create a new AboutUsValue
const createAboutUsValue = async (req, res) => {
    const { title, description } = req.body;
    try {
        let image = req.file.path; //get the path of the image
        const uploadedImage = await cloudinary.uploader.upload(image); // upload the image to cloudinary
        const newAboutUsValue = new AboutUsValue({
            image: uploadedImage.secure_url,
            title,
            description,
        });
        const savedAboutUsValue = await newAboutUsValue.save();
        res.status(201).json({
            message: "AboutUsValue Successfully created",
            data: savedAboutUsValue,
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({
            message: "Failed to create AboutUsValue",
        });
    }
};

//get a AboutUsValue
const getAboutUsValue = async (req, res) => {
    const allAboutUsValue = await AboutUsValue.find();
    res.json({
        message: "All AboutUsValue",
        status: 200,
        data: allAboutUsValue,
    });
};

//delete a AboutUsValue
const deleteAboutUsValue = async (req, res) => {
    const { id } = req.params;
    try {
        await AboutUsValue.findByIdAndRemove(id);
        res.status(200).json({
            message: "AboutUsValue Successfully deleted",
            data: null,
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({
            message: "Failed to delete AboutUsValue",
        });
    }
};

//update AboutUsValue
const updateAboutUsValue = async (req, res) => {
    const { id } = req.params;
    const { title, description } = req.body;
    try {
        let image;
        if (req.file) {
            image = await req.file.path;
            const uploadedImage = await cloudinary.uploader.upload(image);
            image = uploadedImage.secure_url;
        }
        const editAboutUsValue = {
            image,
            title,
            description,
        };
        const updatedAboutUsValue = await AboutUsValue.findByIdAndUpdate(id, editAboutUsValue);
        res.json({
            message: "AboutUsValue updated successfully",
            status: 200,
            data: editAboutUsValue,
        });
    } catch (error) {
        console.log(error);
        res.json({
            message: "AboutUsValue updated failed",
            status: 203,
        });
    }
};


export default {
    createAboutUsValue,
    getAboutUsValue,
    deleteAboutUsValue,
    updateAboutUsValue
};
