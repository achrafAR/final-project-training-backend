import mongoose from "mongoose";

const activityDescriptionSchema = mongoose.Schema({
    title: {
        type: String,
        required: true,
    },
    description: {
        type: String,
        required: true
    },
    image:
        {
        type:String,
        required: true
        },
    
    
});

const ActivityDescription = mongoose.model("ActivityDescription", activityDescriptionSchema);
export default ActivityDescription;
