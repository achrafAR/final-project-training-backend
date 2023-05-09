import mongoose from "mongoose";

const asiRiverSchema = mongoose.Schema({
    title: {
        type: String,
        required: true,
    },
    description: {
        type: String,
        required: true,
    },
    image:[
        {
            type:String,
            required: true
        },
    ]
    
});

const AsiRiver = mongoose.model("AsiRiver", asiRiverSchema);
export default AsiRiver;