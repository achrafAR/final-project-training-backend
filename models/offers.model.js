import mongoose, { trusted } from "mongoose";

const offersSchema = mongoose.Schema({
    image:[{
        type: String,
        required: true,
    }]
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
    capacity: {
        type: Number,
        required:true
    },
    quantity: {
        type: Number,
        required:true
    },
    reserve: {
        type: Boolean,
        required:true
    },
    ratingId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Rating",
    }
    
    



},
{ timestamps:true}
);

const Offers = mongoose.model("Offers", offersSchema);
export default Offers;
