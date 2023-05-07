import mongoose from "mongoose";

const openingSchema = mongoose.Schema({
    title: {
        type: String,
        required: true,
    },
    openingDate: {
        type: String,
        required: true
    },

    image:[
        {
            type:String,
            required: true
        },
    ]
    
});

const Opening = mongoose.model("Opening", openingSchema);
export default Opening;
