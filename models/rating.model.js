import mongoose from "mongoose";

const ratingSchema = mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    offerId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Offers",
    },
    userId:
    {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
    },
    rating: {
        type: Number,

    }




});

const Review = mongoose.model("Review", reviewSchema);
export default Review;