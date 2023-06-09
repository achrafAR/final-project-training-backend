import mongoose from "mongoose";

const contactUsDetailsSchema = mongoose.Schema({
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


});

const ContactUsDetails = mongoose.model("ContactUsDetails", contactUsDetailsSchema);
export default ContactUsDetails;
