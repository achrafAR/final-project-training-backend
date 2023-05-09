import mongoose from "mongoose";

const raftingFounderSchema = mongoose.Schema({
    title: {
        type: String,
        required: true,
    },
    description: {
        type: String,
        required: true,
    }
    
    
});

const RaftingFounder = mongoose.model("RaftingFounder", raftingFounderSchema);
export default RaftingFounder;
