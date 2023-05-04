import mongoose from "mongoose";

const pagesSchema = mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    link: {
        type: String,
        required: true,
    },
    
});

const Pages = mongoose.model("Pages", pagesSchema);
export default Pages;