import mongoose from "mongoose";

const aboutUsTeamSchema = mongoose.Schema({
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

const AboutUsTeam = mongoose.model("AboutUsTeam", aboutUsTeamSchema);
export default AboutUsTeam;
