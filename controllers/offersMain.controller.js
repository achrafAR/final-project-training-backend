import OffersMain from "../models/offersMain.model.js";
import { v2 as cloudinary } from "cloudinary";



cloudinary.config({
    cloud_name: "didb7l6nz",
    api_key: "721724432988673",
    api_secret: "xhRyWzzuWWbgblhPRZ8cVk_Ss7Q",
});

//create a new OffersMain
const createOffersMain = async (req, res) => {
    const { title, description ,backgroundName} = req.body;
    try {
        let image = req.file.path; //get the path of the image
        const uploadedImage = await cloudinary.uploader.upload(image); // upload the image to cloudinary
        const newOffersMain = new OffersMain({
            image: uploadedImage.secure_url,
            title,
            description,
            backgroundName
        });
        const savedOffersMain = await newOffersMain.save();
        res.status(201).json({
            message: "OffersMain Successfully created",
            data: savedOffersMain,
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({
            message: "Failed to create OffersMain",
        });
    }
};

//get a OffersMain
const getOffersMain = async (req, res) => {
    const allOffersMain = await OffersMain.find();
    res.json({
        message: "All OffersMain",
        status: 200,
        data: allOffersMain,
    });
};

//delete a OffersMain
const deleteOffersMain = async (req, res) => {
    const { id } = req.params;
    try {
        await OffersMain.findByIdAndRemove(id);
        res.status(200).json({
            message: "OffersMain Successfully deleted",
            data: null,
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({
            message: "Failed to delete OffersMain",
        });
    }
};

//update OffersMain
const updateOffersMain = async (req, res) => {
    const { id } = req.params;
    const { title, description,backgroundName } = req.body;
    try {
        let image;
        if (req.file) {
            image = await req.file.path;
            const uploadedImage = await cloudinary.uploader.upload(image);
            image = uploadedImage.secure_url;
        }
        const editOffersMain = {
            image,
            title,
            description,
            backgroundName,
        };
        const updatedOffersMain = await OffersMain.findByIdAndUpdate(id, editOffersMain);
        res.json({
            message: "OffersMain updated successfully",
            status: 200,
            data: editOffersMain,
        });
    } catch (error) {
        console.log(error);
        res.json({
            message: "OffersMain updated failed",
            status: 203,
        });
    }
};


export default {
    createOffersMain,
    getOffersMain,
    deleteOffersMain,
    updateOffersMain
};
