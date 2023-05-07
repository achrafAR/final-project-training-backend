import VideoDescription from "../models/videoDescription.model.js";
import { v2 as cloudinary } from "cloudinary";



cloudinary.config({
    cloud_name: "didb7l6nz",
    api_key: "721724432988673",
    api_secret: "xhRyWzzuWWbgblhPRZ8cVk_Ss7Q",
});

//create a new VideoDescription
const createVideoDescription = async (req, res) => {
    const { title, description,namePhotographer, descriptionPhotographer } = req.body;
    try {
        const uploadedFiles = await upload(req);
        const uploadedImage = await cloudinary.uploader.upload(uploadedFiles.image[0].path); // upload the image to cloudinary
        const uploadedVideo = await cloudinary.uploader.upload(uploadedFiles.video[0].path); // upload the video to cloudinary
        const newVideoDescription = new VideoDescription({
            imagePhotographer: uploadedImage.secure_url,
            video: uploadedVideo.secure_url,
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
    const { title, description, namePhotographer, descriptionPhotographer } = req.body;
    try {
        let imagePhotographer;
        let video;
        if (req.file) {
            imagePhotographer = await req.file.path;
            video = await req.file.path;
            const uploadedImage = await cloudinary.uploader.upload(image);
            const uploadedVideo = await cloudinary.uploader.upload(video);
            imagePhotographer = uploadedImage.secure_url;
            video = uploadedVideo.secure_url;
        }
        const editVideoDescription = {
            imagePhotographer,
            video,
            title,
            description,
            namePhotographer,
            descriptionPhotographer,
        };
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
