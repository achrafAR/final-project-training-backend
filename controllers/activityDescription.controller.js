import ActivityDescription from "../models/activityDescription.model.js";
import { v2 as cloudinary } from "cloudinary";



cloudinary.config({
    cloud_name: "didb7l6nz",
    api_key: "721724432988673",
    api_secret: "xhRyWzzuWWbgblhPRZ8cVk_Ss7Q",
});

//create a new HomeUi
const createActivityDescription = async (req, res) => {
    const { title, description } = req.body;
    try {
        let image = req.file.path; //get the path of the image
        const uploadedImage = await cloudinary.uploader.upload(image); // upload the image to cloudinary
        const newActivityDescription = new ActivityDescription({
            image: uploadedImage.secure_url,
            title,
            description,
        });
        const savedActivityDescription = await newActivityDescription.save();
        res.status(201).json({
            message: "ActivityDescription Successfully created",
            data: savedActivityDescription,
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({
            message: "Failed to create ActivityDescription",
        });
    }
};

//get a ActivityDescription
const getActivityDescription = async (req, res) => {
    const allActivityDescription = await ActivityDescription.find();
    res.json({
        message: "All ActivityDescription",
        status: 200,
        data: allActivityDescription,
    });
};

//delete a ActivityDescription
const deleteActivityDescription = async (req, res) => {
    const { id } = req.params;
    try {
        await ActivityDescription.findByIdAndRemove(id);
        res.status(200).json({
            message: "ActivityDescription Successfully deleted",
            data: null,
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({
            message: "Failed to delete ActivityDescription",
        });
    }
};

//update ActivityDescription
const updateActivityDescription = async (req, res) => {
    const { id } = req.params;
    const { title, description } = req.body;
    try {
        let image;
        if (req.file) {
            image = await req.file.path;
            const uploadedImage = await cloudinary.uploader.upload(image);
            image = uploadedImage.secure_url;
        }
        const editActivityDescription = {
            image,
            title,
            description,
        };
        const updatedActivityDescription = await ActivityDescription.findByIdAndUpdate(id, editActivityDescription);
        res.json({
            message: "ActivityDescription updated successfully",
            status: 200,
            data: editActivityDescription,
        });
    } catch (error) {
        console.log(error);
        res.json({
            message: "ActivityDescription updated failed",
            status: 203,
        });
    }
};


export default {
    createActivityDescription,
    getActivityDescription,
    deleteActivityDescription,
    updateActivityDescription
};
