import mongoose from "mongoose";

const contactUsMainSchema = mongoose.Schema({
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
    backgroundName: {
        type: String,
        required:true,
    }


});

const ContactUsMain = mongoose.model("ContactUsMain", contactUsMainSchema);
export default ContactUsMain;
