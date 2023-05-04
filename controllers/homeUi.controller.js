import HomeUi from "../models/homeUi.model.js";
import { v2 as cloudinary } from "cloudinary";



cloudinary.config({
    cloud_name: "didb7l6nz",
    api_key: "721724432988673",
    api_secret: "xhRyWzzuWWbgblhPRZ8cVk_Ss7Q",
});

//create a new HomeUi
const createHomeUi = async (req, res) => {
    const { title, description, features } = req.body;
    try {
        let image = req.file.path; //get the path of the image
        const uploadedImage = await cloudinary.uploader.upload(image); // upload the image to cloudinary
        const newHomeUi = new HomeUi({
            image: uploadedImage.secure_url,
            title,
            description,
            features,
        });
        const savedHomeUi = await newHomeUi.save();
        res.status(201).json({
            message: "HomeUi Successfully created",
            data: savedHomeUi,
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({
            message: "Failed to create homeUi",
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
    const { title, description, features } = req.body;
    try {
        let image;
        if (req.file) {
            image = await req.file.path;
            const uploadedImage = await cloudinary.uploader.upload(image);
            image = uploadedImage.secure_url;
        }
        const editHomeUi = {
            image,
            title,
            description,
            features,
        };
        const updatedHomeUi = await HomeUi.findByIdAndUpdate(id, editHomeUi);
        res.json({
            message: "HomeUi updated successfully",
            status: 200,
            data: editHomeUi,
        });
    } catch (error) {
        console.log(error);
        res.json({
            message: "HomeUi updated failed",
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
