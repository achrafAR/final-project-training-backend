import mongoose from "mongoose";

const generalGallerySchema = mongoose.Schema({
    title: {
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

const GeneralGallery = mongoose.model("GeneralGallery", generalGallerySchema);
export default GeneralGallery;
