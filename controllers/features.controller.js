import Features from "../models/features.model.js";


//create a new Features
const createFeatures = async (req, res) => {
    const { number, title, description } = req.body;
    try {
        const newFeatures = new Features({
            number,
            title,
            description,
        });
        const savedFeatures = await newFeatures.save();
        res.status(201).json({
            message: "Features Successfully created",
            data: savedFeatures,
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({
            message: "Failed to create Features",
        });
    }
};

//get a Features
const getFeatures = async (req, res) => {
    const allFeatures = await Features.find();
    res.json({
        message: "All Features",
        status: 200,
        data: allFeatures,
    });
};

//delete a Features
const deleteFeatures = async (req, res) => {
    const { id } = req.params;
    try {
        await Features.findByIdAndRemove(id);
        res.status(200).json({
            message: "Features Successfully deleted",
            data: null,
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({
            message: "Failed to delete Features",
        });
    }
};

//update Features
const updateFeatures = async (req, res) => {
    const { id } = req.params;
    try {
        const { number, title, description } = req.body;
        const editFeatures = {
            number,
            title,
            description,
        };
        const updatedFeatures = await Features.findByIdAndUpdate(id, editFeatures);
        res.json({
            message: "Features updated successfully",
            status: 200,
            data: editFeatures,
        });
    } catch (error) {
        console.log(error);
        res.json({
            message: "Features updated failed",
            status: 203,
        });
    }
};


export default {
    createFeatures,
    getFeatures,
    deleteFeatures,
    updateFeatures
};
