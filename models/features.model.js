import mongoose from "mongoose";

const featuresSchema = mongoose.Schema({
    number: {
        type: Number,
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
    
});

const Features = mongoose.model("Features", featuresSchema);
export default Features;