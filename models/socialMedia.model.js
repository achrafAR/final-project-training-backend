import mongoose from "mongoose";

const socialMediaSchema = mongoose.Schema({
    image: {
        type: String,
        required: true,
    },
    link: {
        type: String,
        required: true,
    }
    
    
});

const SocialMedia = mongoose.model("SocialMedia", socialMediaSchema);
export default SocialMedia;
