import mongoose from "mongoose";

const aboutUsSchema = mongoose.Schema({
    background: {
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
    values: 
        [
            {
                imageValue: {
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
            },
        ],
        team: 
        [
            {
                imageTeam: {
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
            },
        ],
    
});

const AboutUs = mongoose.model("AboutUs", aboutUsSchema);
export default AboutUs;
