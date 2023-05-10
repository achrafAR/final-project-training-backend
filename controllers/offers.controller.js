import Offers from "../models/offers.model.js";
import { v2 as cloudinary } from "cloudinary";



cloudinary.config({
    cloud_name: "didb7l6nz",
    api_key: "721724432988673",
    api_secret: "xhRyWzzuWWbgblhPRZ8cVk_Ss7Q",
});

//create a new Offers
const createOffers = async (req, res) => {
    const { title, description, price, capacity, quantity, reserve } = req.body;
    try {
        let image = req.file.path; //get the path of the image
        const uploadedImage = await cloudinary.uploader.upload(image); // upload the image to cloudinary
        const newOffers = new Offers({
            image: uploadedImage.secure_url,
            title,
            description,
            price,
            capacity,
            quantity,
            reserve,
        });
        const savedOffers = await newOffers.save();
        res.status(201).json({
            message: "Offers Successfully created",
            data: savedOffers,
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({
            message: "Failed to create Offers",
        });
    }
};

//get a Offers
const getOffers = async (req, res) => {
    const allOffers = await Offers.find();
    res.json({
        message: "All Offers",
        status: 200,
        data: allOffers,
    });
};

//delete a Offers
const deleteOffers = async (req, res) => {
    const { id } = req.params;
    try {
        await Offers.findByIdAndRemove(id);
        res.status(200).json({
            message: "Offers Successfully deleted",
            data: null,
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({
            message: "Failed to delete Offers",
        });
    }
};

//update Offers
const updateOffers = async (req, res) => {
    const { id } = req.params;
    const { title, description, price, capacity, quantity, reserve } = req.body;
    try {
        let image;
        if (req.file) {
            image = await req.file.path;
            const uploadedImage = await cloudinary.uploader.upload(image);
            image = uploadedImage.secure_url;
        }
        const editOffers = {
            image,
            title,
            description,
            price,
            capacity,
            quantity,
            reserve,
        };
        const updatedOffers = await Offers.findByIdAndUpdate(id, editOffers);
        res.json({
            message: "Offers updated successfully",
            status: 200,
            data: editOffers,
        });
    } catch (error) {
        console.log(error);
        res.json({
            message: "Offers updated failed",
            status: 203,
        });
    }
};


export default {
    createOffers,
    getOffers,
    deleteOffers,
    updateOffers
};
