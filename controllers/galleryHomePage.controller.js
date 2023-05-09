import GalleryHomePage from "../models/galleryHomePage.model.js";
import { v2 as cloudinary } from "cloudinary";



cloudinary.config({
    cloud_name: "didb7l6nz",
    api_key: "721724432988673",
    api_secret: "xhRyWzzuWWbgblhPRZ8cVk_Ss7Q",
});

//create a new Popular
const createGalleryHomePage = async (req, res) => {
    const { title, description } = req.body;
    try {
        let image = req.file.path; //get the path of the image
        const uploadedImage = await cloudinary.uploader.upload(image); // upload the image to cloudinary
        const newGalleryHomePage = new GalleryHomePage({
            image: uploadedImage.secure_url,
            title,
            description,
        });
        const savedGalleryHomePage = await newGalleryHomePage.save();
        res.status(201).json({
            message: "GalleryHomePage Successfully created",
            data: savedGalleryHomePage,
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({
            message: "Failed to create GalleryHomePage",
        });
    }
};

//get a GalleryHomePage
const getGalleryHomePage = async (req, res) => {
    const allGalleryHomePage = await GalleryHomePage.find();
    res.json({
        message: "All GalleryHomePage",
        status: 200,
        data: allGalleryHomePage,
    });
};

//delete a GalleryHomePage
const deleteGalleryHomePage = async (req, res) => {
    const { id } = req.params;
    try {
        await GalleryHomePage.findByIdAndRemove(id);
        res.status(200).json({
            message: "GalleryHomePage Successfully deleted",
            data: null,
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({
            message: "Failed to delete GalleryHomePage",
        });
    }
};

//update GalleryHomePage
const updateGalleryHomePage = async (req, res) => {
    const { id } = req.params;
    const { title, description } = req.body;
    try {
        let image;
        if (req.file) {
            image = await req.file.path;
            const uploadedImage = await cloudinary.uploader.upload(image);
            image = uploadedImage.secure_url;
        }
        const editGalleryHomePage = {
            image,
            title,
            description,
        };
        const updatedGalleryHomePage = await GalleryHomePage.findByIdAndUpdate(id, editGalleryHomePage);
        res.json({
            message: "GalleryHomePage updated successfully",
            status: 200,
            data: editGalleryHomePage,
        });
    } catch (error) {
        console.log(error);
        res.json({
            message: "GalleryHomePage updated failed",
            status: 203,
        });
    }
};


export default {
    createGalleryHomePage,
    getGalleryHomePage,
    deleteGalleryHomePage,
    updateGalleryHomePage
};
