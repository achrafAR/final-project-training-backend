import mongoose from "mongoose";

const aboutUsDescriptionSchema = mongoose.Schema({
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

const AboutUsDescription = mongoose.model("AboutUsDescription", aboutUsDescriptionSchema);
export default AboutUsDescription;
