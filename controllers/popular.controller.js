import Popular from "../models/popular.model.js";
import { v2 as cloudinary } from "cloudinary";



cloudinary.config({
    cloud_name: "didb7l6nz",
    api_key: "721724432988673",
    api_secret: "xhRyWzzuWWbgblhPRZ8cVk_Ss7Q",
});

//create a new Popular
const createPopular = async (req, res) => {
    const { title, description, location } = req.body;
    try {
        let image = req.file.path; //get the path of the image
        const uploadedImage = await cloudinary.uploader.upload(image); // upload the image to cloudinary
        const newPopular = new Popular({
            image: uploadedImage.secure_url,
            title,
            description,
            location,
        });
        const savedPopular = await newPopular.save();
        res.status(201).json({
            message: "Popular Successfully created",
            data: savedPopular,
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({
            message: "Failed to create Popular",
        });
    }
};

//get a Popular
const getPopular = async (req, res) => {
    const allPopular = await Popular.find();
    res.json({
        message: "All Popular",
        status: 200,
        data: allPopular,
    });
};

//delete a Popular
const deletePopular = async (req, res) => {
    const { id } = req.params;
    try {
        await Popular.findByIdAndRemove(id);
        res.status(200).json({
            message: "Popular Successfully deleted",
            data: null,
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({
            message: "Failed to delete Popular",
        });
    }
};

//update Popular
const updatePopular = async (req, res) => {
    const { id } = req.params;
    const { title, description, location } = req.body;
    try {
        let image;
        if (req.file) {
            image = await req.file.path;
            const uploadedImage = await cloudinary.uploader.upload(image);
            image = uploadedImage.secure_url;
        }
        const editPopular = {
            image,
            title,
            description,
            location,
        };
        const updatedPopular = await Popular.findByIdAndUpdate(id, editPopular);
        res.json({
            message: "Popular updated successfully",
            status: 200,
            data: editPopular,
        });
    } catch (error) {
        console.log(error);
        res.json({
            message: "Popular updated failed",
            status: 203,
        });
    }
};


export default {
    createPopular,
    getPopular,
    deletePopular,
    updatePopular
};
