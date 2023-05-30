import mongoose, { trusted } from "mongoose";

const offersSchema = mongoose.Schema({
    image: {
        type: String,
        required: true,
    }
    ,
    title: {
        type: String,
        required: true,
    },
    description: {
        type: String,
        required: true,
    },
    price: {
        type: Number,
        required: true,
    },
    is_reserved: {
        type: Boolean,
        required: true
    },
    capacity: {
        type: Number,
        required: true
    },
    rating: {
        type: Number,
        required: true
    },
    totalClick:{
        type: Number,
        required: true
    },
    totalRating:{
        type: Number,
        required: true
    }
},
    { timestamps: true }
);


const Offers = mongoose.model("Offers", offersSchema);
export default Offers;
