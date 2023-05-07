import socialMedia from "../models/socialMedia.model.js";
import { v2 as cloudinary } from "cloudinary";



cloudinary.config({
    cloud_name: "didb7l6nz",
    api_key: "721724432988673",
    api_secret: "xhRyWzzuWWbgblhPRZ8cVk_Ss7Q",
});

//create a new socialMedia
const createSocialMedia = async (req, res) => {
    const { link } = req.body;
    try {
        let image = req.file.path; //get the path of the image
        const uploadedImage = await cloudinary.uploader.upload(image); // upload the image to cloudinary
        const newSocialMedia = new socialMedia({
            image: uploadedImage.secure_url,
            link,
        });
        const savedSocialMedia = await newSocialMedia.save();
        res.status(201).json({
            message: "socialMedia Successfully created",
            data: savedSocialMedia,
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({
            message: "Failed to create SocialMedia",
        });
    }
};

//get a socialMedia
const getSocialMedia = async (req, res) => {
    const allSocialMedia = await socialMedia.find();
    res.json({
        message: "All socialMedia",
        status: 200,
        data: allSocialMedia,
    });
};

//delete a socialMedia
const deleteSocialMedia = async (req, res) => {
    const { id } = req.params;
    try {
        await socialMedia.findByIdAndRemove(id);
        res.status(200).json({
            message: "socialMedia Successfully deleted",
            data: null,
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({
            message: "Failed to delete socialMedia",
        });
    }
};

//update socialMedia
const updateSocialMedia = async (req, res) => {
    const { id } = req.params;
    const { link } = req.body;
    try {
        let image;
        if (req.file) {
            image = await req.file.path;
            const uploadedImage = await cloudinary.uploader.upload(image);
            image = uploadedImage.secure_url;
        }
        const editSocialMedia = {
            image,
            link,
        };
        const updatedSocialMedia = await socialMedia.findByIdAndUpdate(id, editSocialMedia);
        res.json({
            message: "socialMedia updated successfully",
            status: 200,
            data: editSocialMedia,
        });
    } catch (error) {
        console.log(error);
        res.json({
            message: "socialMedia updated failed",
            status: 203,
        });
    }
};


export default {
    createSocialMedia,
    getSocialMedia,
    deleteSocialMedia,
    updateSocialMedia
};
