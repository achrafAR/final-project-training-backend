import Pages from "../models/pages.model.js";


//create a new Pages
const createPages = async (req, res) => {
    const { name, link } = req.body;
    try {
        const newPages = new Pages({
            name,
            link,
        });
        const savedPages = await newPages.save();
        res.status(201).json({
            message: "Pages Successfully created",
            data: savedPages,
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({
            message: "Failed to create Pages",
        });
    }
};

//get a Pages
const getPages = async (req, res) => {
    const allPages = await Pages.find();
    res.json({
        message: "All Pages",
        status: 200,
        data: allPages,
    });
};

//delete a Pages
const deletePages = async (req, res) => {
    const { id } = req.params;
    try {
        await Pages.findByIdAndRemove(id);
        res.status(200).json({
            message: "Pages Successfully deleted",
            data: null,
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({
            message: "Failed to delete Pages",
        });
    }
};

//update Pages
const updatePages = async (req, res) => {
    const { id } = req.params;
    try {
        const { name, link } = req.body;
        const editPages = {
            name,
            link,
        };
        const updatedPages = await Pages.findByIdAndUpdate(id, editPages);
        res.json({
            message: "Pages updated successfully",
            status: 200,
            data: editPages,
        });
    } catch (error) {
        console.log(error);
        res.json({
            message: "Pages updated failed",
            status: 203,
        });
    }
};


export default {
    createPages,
    getPages,
    deletePages,
    updatePages
};
