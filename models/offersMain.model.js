import mongoose from "mongoose";

const offersMainSchema = mongoose.Schema({
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

const OffersMain = mongoose.model("OffersMain", offersMainSchema);
export default OffersMain;
