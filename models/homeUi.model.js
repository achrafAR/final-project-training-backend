import mongoose from "mongoose";

const homeUiSchema = mongoose.Schema({
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
    features: 
        [
            {
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
            },
        ],
    
});

const HomeUi = mongoose.model("HomeUi", homeUiSchema);
export default HomeUi;
