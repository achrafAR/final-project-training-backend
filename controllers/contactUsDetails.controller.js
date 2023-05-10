import ContactUsDetails from "../models/contactUsDetails.model.js";
import { v2 as cloudinary } from "cloudinary";



cloudinary.config({
    cloud_name: "didb7l6nz",
    api_key: "721724432988673",
    api_secret: "xhRyWzzuWWbgblhPRZ8cVk_Ss7Q",
});

//create a new ContactUsDetails
const createContactUsDetails = async (req, res) => {
    const { title, description } = req.body;
    try {
        let image = req.file.path; //get the path of the image
        const uploadedImage = await cloudinary.uploader.upload(image); // upload the image to cloudinary
        const newContactUsDetails = new ContactUsDetails({
            image: uploadedImage.secure_url,
            title,
            description,
        });
        const savedContactUsDetails = await newContactUsDetails.save();
        res.status(201).json({
            message: "ContactUsDetails Successfully created",
            data: savedContactUsDetails,
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({
            message: "Failed to create ContactUsDetails",
        });
    }
};

//get a ContactUsDetails
const getContactUsDetails = async (req, res) => {
    const allContactUsDetails = await ContactUsDetails.find();
    res.json({
        message: "All ContactUsDetails",
        status: 200,
        data: allContactUsDetails,
    });
};

//delete a ContactUsDetails
const deleteContactUsDetails = async (req, res) => {
    const { id } = req.params;
    try {
        await ContactUsDetails.findByIdAndRemove(id);
        res.status(200).json({
            message: "ContactUsDetails Successfully deleted",
            data: null,
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({
            message: "Failed to delete ContactUsDetails",
        });
    }
};

//update ContactUsDetails
const updateContactUsDetails = async (req, res) => {
    const { id } = req.params;
    const { title, description } = req.body;
    try {
        let image;
        if (req.file) {
            image = await req.file.path;
            const uploadedImage = await cloudinary.uploader.upload(image);
            image = uploadedImage.secure_url;
        }
        const editContactUsDetails = {
            image,
            title,
            description,
        };
        const updatedContactUsDetails = await ContactUsDetails.findByIdAndUpdate(id, editContactUsDetails);
        res.json({
            message: "ContactUsDetails updated successfully",
            status: 200,
            data: editContactUsDetails,
        });
    } catch (error) {
        console.log(error);
        res.json({
            message: "ContactUsDetails updated failed",
            status: 203,
        });
    }
};


export default {
    createContactUsDetails,
    getContactUsDetails,
    deleteContactUsDetails,
    updateContactUsDetails
};
