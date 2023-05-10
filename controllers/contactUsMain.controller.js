import ContactUsMain from "../models/contactUsMain.model.js";
import { v2 as cloudinary } from "cloudinary";



cloudinary.config({
    cloud_name: "didb7l6nz",
    api_key: "721724432988673",
    api_secret: "xhRyWzzuWWbgblhPRZ8cVk_Ss7Q",
});

//create a new ContactUsMain
const createContactUsMain = async (req, res) => {
    const { title, description } = req.body;
    try {
        let image = req.file.path; //get the path of the image
        const uploadedImage = await cloudinary.uploader.upload(image); // upload the image to cloudinary
        const newContactUsMain = new ContactUsMain({
            image: uploadedImage.secure_url,
            title,
            description,
        });
        const savedContactUsMain = await newContactUsMain.save();
        res.status(201).json({
            message: "ContactUsMain Successfully created",
            data: savedContactUsMain,
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({
            message: "Failed to create ContactUsMain",
        });
    }
};

//get a ContactUsMain
const getContactUsMain = async (req, res) => {
    const allContactUsMain = await ContactUsMain.find();
    res.json({
        message: "All ContactUsMain",
        status: 200,
        data: allContactUsMain,
    });
};

//delete a ContactUsMain
const deleteContactUsMain = async (req, res) => {
    const { id } = req.params;
    try {
        await ContactUsMain.findByIdAndRemove(id);
        res.status(200).json({
            message: "ContactUsMain Successfully deleted",
            data: null,
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({
            message: "Failed to delete ContactUsMain",
        });
    }
};

//update ContactUsMain
const updateContactUsMain = async (req, res) => {
    const { id } = req.params;
    const { title, description } = req.body;
    try {
        let image;
        if (req.file) {
            image = await req.file.path;
            const uploadedImage = await cloudinary.uploader.upload(image);
            image = uploadedImage.secure_url;
        }
        const editContactUsMain = {
            image,
            title,
            description,
        };
        const updatedContactUsMain = await ContactUsMain.findByIdAndUpdate(id, editContactUsMain);
        res.json({
            message: "ContactUsMain updated successfully",
            status: 200,
            data: editContactUsMain,
        });
    } catch (error) {
        console.log(error);
        res.json({
            message: "ContactUsMain updated failed",
            status: 203,
        });
    }
};


export default {
    createContactUsMain,
    getContactUsMain,
    deleteContactUsMain,
    updateContactUsMain
};
