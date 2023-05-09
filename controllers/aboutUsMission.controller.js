import AboutUsMission from "../models/aboutUsMission.model.js";
import { v2 as cloudinary } from "cloudinary";



cloudinary.config({
    cloud_name: "didb7l6nz",
    api_key: "721724432988673",
    api_secret: "xhRyWzzuWWbgblhPRZ8cVk_Ss7Q",
});

//create a new AboutUsMission
const createAboutUsMission = async (req, res) => {
    const { title, description } = req.body;
    try {
        const newAboutUsMission = new AboutUsMission({
            title,
            description
        });
        const savedAboutUsMission = await newAboutUsMission.save();
        res.status(201).json({
            message: "AboutUsMission Successfully created",
            data: savedAboutUsMission,
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({
            message: "Failed to create AboutUsMission",
        });
    }
};

//get a AboutUsMission
const getAboutUsMission = async (req, res) => {
    const allAboutUsMission = await AboutUsMission.find();
    res.json({
        message: "All AboutUsMission",
        status: 200,
        data: allAboutUsMission,
    });
};

//delete a AboutUsMission
const deleteAboutUsMission = async (req, res) => {
    const { id } = req.params;
    try {
        await AboutUsMission.findByIdAndRemove(id);
        res.status(200).json({
            message: "AboutUsMission Successfully deleted",
            data: null,
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({
            message: "Failed to delete AboutUsMission",
        });
    }
};

//update AboutUsMission
const updateAboutUsMission = async (req, res) => {
    const { id } = req.params;
    const { title, description } = req.body;
    try {
    
        const editAboutUsMission = {
            title,
            description,
        };
        const updatedAboutUsMission = await AboutUsMission.findByIdAndUpdate(id, editAboutUsMission);
        res.json({
            message: "AboutUsMission updated successfully",
            status: 200,
            data: editAboutUsMission,
        });
    } catch (error) {
        console.log(error);
        res.json({
            message: "AboutUsMission updated failed",
            status: 203,
        });
    }
};


export default {
    createAboutUsMission,
    getAboutUsMission,
    deleteAboutUsMission,
    updateAboutUsMission
};
