import mongoose from "mongoose";

const aboutUsValueSchema = mongoose.Schema({
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


});

const AboutUsValue = mongoose.model("AboutUsValue", aboutUsValueSchema);
export default AboutUsValue;
