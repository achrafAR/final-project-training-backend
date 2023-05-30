import AboutUsMain from "../models/aboutUsMain.model.js";
import { v2 as cloudinary } from "cloudinary";



cloudinary.config({
    cloud_name: "didb7l6nz",
    api_key: "721724432988673",
    api_secret: "xhRyWzzuWWbgblhPRZ8cVk_Ss7Q",
});

//create a new AboutUsMain
const createAboutUsMain = async (req, res) => {
    const { title, description ,backgroundName} = req.body;
    try {
        let image = req.file.path; //get the path of the image
        const uploadedImage = await cloudinary.uploader.upload(image); // upload the image to cloudinary
        const newAboutUsMain = new AboutUsMain({
            image: uploadedImage.secure_url,
            title,
            description,
            backgroundName
        });
        const savedAboutUsMain = await newAboutUsMain.save();
        res.status(201).json({
            message: "AboutUsMain Successfully created",
            data: savedAboutUsMain,
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({
            message: "Failed to create AboutUsMain",
        });
    }
};

//get a AboutUsMain
const getAboutUsMain = async (req, res) => {
    const allAboutUsMain = await AboutUsMain.find();
    res.json({
        message: "All AboutUsMain",
        status: 200,
        data: allAboutUsMain,
    });
};

//delete a AboutUsMain
const deleteAboutUsMain = async (req, res) => {
    const { id } = req.params;
    try {
        await AboutUsMain.findByIdAndRemove(id);
        res.status(200).json({
            message: "AboutUsMain Successfully deleted",
            data: null,
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({
            message: "Failed to delete AboutUsMain",
        });
    }
};

//update AboutUsMain
const updateAboutUsMain = async (req, res) => {
    const { id } = req.params;
    const { title, description,backgroundName } = req.body;
    try {
        let image;
        if (req.file) {
            image = await req.file.path;
            const uploadedImage = await cloudinary.uploader.upload(image);
            image = uploadedImage.secure_url;
        }
        const editAboutUsMain = {
            image,
            title,
            description,
            backgroundName,
        };
        const updatedAboutUsMain = await AboutUsMain.findByIdAndUpdate(id, editAboutUsMain);
        res.json({
            message: "AboutUsMain updated successfully",
            status: 200,
            data: editAboutUsMain,
        });
    } catch (error) {
        console.log(error);
        res.json({
            message: "AboutUsMain updated failed",
            status: 203,
        });
    }
};


export default {
    createAboutUsMain,
    getAboutUsMain,
    deleteAboutUsMain,
    updateAboutUsMain
};
