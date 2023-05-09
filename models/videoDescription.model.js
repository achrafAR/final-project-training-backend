import mongoose from "mongoose";

const videoDescriptionSchema = mongoose.Schema({
    
    title: {
        type: String,
        required: true,
    },
    description: {
        type: String,
        required: true,
    },
    videoLink: {
        type: String,
        required: true,
    },
    imagePhotographer:{
        type: String,
        required: true,
    },
    namePhotographer: {
        type: String,
        required: true,
    },
    descriptionPhotographer: {
        type: String,
        required: true,
    }
    
    
});

const VideoDescription = mongoose.model("VideoDescription", videoDescriptionSchema);
export default VideoDescription;
