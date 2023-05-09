import RaftingFounder from "../models/raftingFounder.model.js";


//create a new RaftingFounder
const createRaftingFounder = async (req, res) => {
    const { title, description } = req.body;
    try {
        const newRaftingFounder = new RaftingFounder({
            title,
            description,
        });
        const savedRaftingFounder = await newRaftingFounder.save();
        res.status(201).json({
            message: "RaftingFounder Successfully created",
            data: savedRaftingFounder,
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({
            message: "Failed to create RaftingFounder",
        });
    }
};

//get a RaftingFounder
const getRaftingFounder = async (req, res) => {
    const allRaftingFounder = await RaftingFounder.find();
    res.json({
        message: "All RaftingFounder",
        status: 200,
        data: allRaftingFounder,
    });
};

//delete a RaftingFounder
const deleteRaftingFounder = async (req, res) => {
    const { id } = req.params;
    try {
        await RaftingFounder.findByIdAndRemove(id);
        res.status(200).json({
            message: "RaftingFounder Successfully deleted",
            data: null,
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({
            message: "Failed to delete RaftingFounder",
        });
    }
};

//update RaftingFounder
const updateRaftingFounder = async (req, res) => {
    const { id } = req.params;
    try {
        const { title, description } = req.body;
        const editRaftingFounder = {
            title,
            description,
        };
        const updatedRaftingFounder = await RaftingFounder.findByIdAndUpdate(id, editRaftingFounder);
        res.json({
            message: "RaftingFounder updated successfully",
            status: 200,
            data: editRaftingFounder,
        });
    } catch (error) {
        console.log(error);
        res.json({
            message: "RaftingFounder updated failed",
            status: 203,
        });
    }
};


export default {
    createRaftingFounder,
    getRaftingFounder,
    deleteRaftingFounder,
    updateRaftingFounder
};
