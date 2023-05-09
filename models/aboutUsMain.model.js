import mongoose from "mongoose";

const aboutUsMainSchema = mongoose.Schema({
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

const AboutUsMain = mongoose.model("AboutUsMain", aboutUsMainSchema);
export default AboutUsMain;
