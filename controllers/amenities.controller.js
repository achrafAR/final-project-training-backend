import Amenities from "../models/amenities.model.js";
import { v2 as cloudinary } from "cloudinary";



cloudinary.config({
    cloud_name: "didb7l6nz",
    api_key: "721724432988673",
    api_secret: "xhRyWzzuWWbgblhPRZ8cVk_Ss7Q",
});

//create a new Amenities
const createAmenities = async (req, res) => {
    const { title } = req.body;
    try {
        let icon = req.file.path; //get the path of the icon
        const uploadedIcon = await cloudinary.uploader.upload(icon); // upload the icon to cloudinary
        const newAmenities = new Amenities({
            icon: uploadedIcon.secure_url,
            title,
        });
        const savedAmenities = await newAmenities.save();
        res.status(201).json({
            message: "Amenities Successfully created",
            data: savedAmenities,
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({
            message: "Failed to create Amenities",
        });
    }
};

//get a Amenities
const getAmenities = async (req, res) => {
    const allAmenities = await Amenities.find();
    res.json({
        message: "All Amenities",
        status: 200,
        data: allAmenities,
    });
};

//delete a Amenities
const deleteAmenities = async (req, res) => {
    const { id } = req.params;
    try {
        await Amenities.findByIdAndRemove(id);
        res.status(200).json({
            message: "Amenities Successfully deleted",
            data: null,
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({
            message: "Failed to delete Amenities",
        });
    }
};

//update Amenities
const updateAmenities = async (req, res) => {
    const { id } = req.params;
    const { title } = req.body;
    try {
        let icon;
        if (req.file) {
            icon = await req.file.path;
            const uploadedIcon = await cloudinary.uploader.upload(icon);
            icon = uploadedIcon.secure_url;
        }
        const editAmenities = {
            icon,
            title,
        };
        const updatedAmenities = await Amenities.findByIdAndUpdate(id, editAmenities);
        res.json({
            message: "Amenities updated successfully",
            status: 200,
            data: editAmenities,
        });
    } catch (error) {
        console.log(error);
        res.json({
            message: "Amenities updated failed",
            status: 203,
        });
    }
};


export default {
    createAmenities,
    getAmenities,
    deleteAmenities,
    updateAmenities
};
