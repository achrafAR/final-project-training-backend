import Welcome from "../models/welcome.model.js";


//create a new Welcome
const createWelcome = async (req, res) => {
    const { title, description } = req.body;
    try {
        const newWelcome = new Welcome({
            title,
            description,
        });
        const savedWelcome = await newWelcome.save();
        res.status(201).json({
            message: "Welcome Successfully created",
            data: savedWelcome,
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({
            message: "Failed to create Welcome",
        });
    }
};

//get a Welcome
const getWelcome = async (req, res) => {
    const allWelcome = await Welcome.find();
    res.json({
        message: "All Welcome",
        status: 200,
        data: allWelcome,
    });
};

//delete a Welcome
const deleteWelcome = async (req, res) => {
    const { id } = req.params;
    try {
        await Welcome.findByIdAndRemove(id);
        res.status(200).json({
            message: "Welcome Successfully deleted",
            data: null,
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({
            message: "Failed to delete Welcome",
        });
    }
};

//update Welcome
const updateWelcome = async (req, res) => {
    const { id } = req.params;
    try {
        const { title, description } = req.body;
        const editWelcome = {
            title,
            description,
        };
        const updatedWelcome = await Welcome.findByIdAndUpdate(id, editWelcome);
        res.json({
            message: "Welcome updated successfully",
            status: 200,
            data: editWelcome,
        });
    } catch (error) {
        console.log(error);
        res.json({
            message: "Welcome updated failed",
            status: 203,
        });
    }
};


export default {
    createWelcome,
    getWelcome,
    deleteWelcome,
    updateWelcome
};
