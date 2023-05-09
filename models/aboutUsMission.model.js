import mongoose from "mongoose";

const aboutUsMissionSchema = mongoose.Schema({
    title: {
        type: String,
        required: true,
    },
    description: {
        type: String,
        required: true,
    },


});

const AboutUsMission = mongoose.model("AboutUsMission", aboutUsMissionSchema);
export default AboutUsMission;
