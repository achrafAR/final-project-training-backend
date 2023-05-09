import mongoose from "mongoose";

const galleryHomePageSchema = mongoose.Schema({
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

const GalleryHomePage = mongoose.model("GalleryHomePage", galleryHomePageSchema);
export default GalleryHomePage;