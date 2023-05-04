import mongoose from "mongoose";

const popularSchema = mongoose.Schema({
    image: {
        type: String,
        required: true,
    },
    title: {
        type: String,
        required: true,
    },
    description: {
        type: String,
        required: true,
    },
    location:{
        type: String,
        required: true,
    }
    
    
});

const Popular = mongoose.model("Popular", popularSchema);
export default Popular;
