import mongoose from "mongoose";

const welcomeSchema = mongoose.Schema({
    title: {
        type: String,
        required: true,
    },
    description: {
        type: String,
        required: true,
    },
    image : {
        type:String,
    }
    
    
});

const Welcome = mongoose.model("Welcome", welcomeSchema);
export default Welcome;
