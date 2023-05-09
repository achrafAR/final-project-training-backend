import AboutUsTeam from "../models/aboutUsTeam.model.js";
import { v2 as cloudinary } from "cloudinary";



cloudinary.config({
    cloud_name: "didb7l6nz",
    api_key: "721724432988673",
    api_secret: "xhRyWzzuWWbgblhPRZ8cVk_Ss7Q",
});

//create a new AboutUsTeam
const createAboutUsTeam = async (req, res) => {
    const { title, description } = req.body;
    try {
        let image = req.file.path; //get the path of the image
        const uploadedImage = await cloudinary.uploader.upload(image); // upload the image to cloudinary
        const newAboutUsTeam = new AboutUsTeam({
            image: uploadedImage.secure_url,
            title,
            description,
        });
        const savedAboutUsTeam = await newAboutUsTeam.save();
        res.status(201).json({
            message: "AboutUsTeam Successfully created",
            data: savedAboutUsTeam,
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({
            message: "Failed to create AboutUsTeam",
        });
    }
};

//get a AboutUsTeam
const getAboutUsTeam = async (req, res) => {
    const allAboutUsTeam = await AboutUsTeam.find();
    res.json({
        message: "All AboutUsTeam",
        status: 200,
        data: allAboutUsTeam,
    });
};

//delete a AboutUsTeam
const deleteAboutUsTeam = async (req, res) => {
    const { id } = req.params;
    try {
        await AboutUsTeam.findByIdAndRemove(id);
        res.status(200).json({
            message: "AboutUsTeam Successfully deleted",
            data: null,
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({
            message: "Failed to delete AboutUsTeam",
        });
    }
};

//update AboutUsTeam
const updateAboutUsTeam = async (req, res) => {
    const { id } = req.params;
    const { title, description } = req.body;
    try {
        let image;
        if (req.file) {
            image = await req.file.path;
            const uploadedImage = await cloudinary.uploader.upload(image);
            image = uploadedImage.secure_url;
        }
        const editAboutUsTeam = {
            image,
            title,
            description,
        };
        const updatedAboutUsTeam = await AboutUsTeam.findByIdAndUpdate(id, editAboutUsTeam);
        res.json({
            message: "AboutUsTeam updated successfully",
            status: 200,
            data: editAboutUsTeam,
        });
    } catch (error) {
        console.log(error);
        res.json({
            message: "AboutUsTeam updated failed",
            status: 203,
        });
    }
};


export default {
    createAboutUsTeam,
    getAboutUsTeam,
    deleteAboutUsTeam,
    updateAboutUsTeam
};
