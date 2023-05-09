import VideoDescription from "../models/videoDescription.model.js";
import { v2 as cloudinary } from "cloudinary";



cloudinary.config({
    cloud_name: "didb7l6nz",
    api_key: "721724432988673",
    api_secret: "xhRyWzzuWWbgblhPRZ8cVk_Ss7Q",
});

//create a new VideoDescription
const createVideoDescription = async (req, res) => {
    console.log(req.body)
    const { title, description, namePhotographer, descriptionPhotographer, videoLink } = req.body;
    try {
        let image = req.file.path; //get the path of the image

        const uploadedImage = await cloudinary.uploader.upload(image); // upload the image to cloudinary
        const newVideoDescription = new VideoDescription({
            imagePhotographer: uploadedImage.secure_url,
            videoLink,
            title,
            description,
            namePhotographer,
            descriptionPhotographer,

        });
        const savedVideoDescription = await newVideoDescription.save();
        res.status(201).json({
            message: "VideoDescription Successfully created",
            data: savedVideoDescription,
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({
            message: "Failed to create VideoDescription",
        });
    }
};

//get a VideoDescription
const getVideoDescription = async (req, res) => {
    const allVideoDescription = await VideoDescription.find();
    res.json({
        message: "All VideoDescription",
        status: 200,
        data: allVideoDescription,
    });
};

//delete a VideoDescription
const deleteVideoDescription = async (req, res) => {
    const { id } = req.params;
    try {
        await VideoDescription.findByIdAndRemove(id);
        res.status(200).json({
            message: "VideoDescription Successfully deleted",
            data: null,
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({
            message: "Failed to delete VideoDescription",
        });
    }
};

//update VideoDescription
const updateVideoDescription = async (req, res) => {
    const { id } = req.params;
    const { title, description, namePhotographer, descriptionPhotographer, videoLink } = req.body;
    try {
        // Retrieve the existing video description
        const existingVideoDescription = await VideoDescription.findById(id);

        // Upload the new image, if it's included in the request body
        let imagePhotographer = existingVideoDescription.imagePhotographer;
        if (req.file) {
            const uploadedImage = await cloudinary.uploader.upload(req.file.path);
            imagePhotographer = uploadedImage.secure_url;
        }

        // Update the fields, using the new value if present, and the existing value otherwise
        const editVideoDescription = {
            imagePhotographer,
            title: title || existingVideoDescription.title,
            description: description || existingVideoDescription.description,
            namePhotographer: namePhotographer || existingVideoDescription.namePhotographer,
            descriptionPhotographer: descriptionPhotographer || existingVideoDescription.descriptionPhotographer,
            videoLink: videoLink || existingVideoDescription.videoLink,
        };

        // Save the updated video description and return the result
        const updatedVideoDescription = await VideoDescription.findByIdAndUpdate(id, editVideoDescription);
        res.json({
            message: "VideoDescription updated successfully",
            status: 200,
            data: editVideoDescription,
        });
    } catch (error) {
        console.log(error);
        res.json({
            message: "VideoDescription updated failed",
            status: 203,
        });
    }
};


export default {
    createVideoDescription,
    getVideoDescription,
    deleteVideoDescription,
    updateVideoDescription
};
