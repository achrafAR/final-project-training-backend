import mongoose from "mongoose";
const myBookingSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    finalPrice:{
        type: Number,
        required: true
    },
    offers: [
        {
            offerId: {
                type: mongoose.Schema.Types.ObjectId,
                ref: 'offers',
                required: true
            },
            offerName:{
                type: String,
                required: true
            },
            quantity: {
                type: Number,
                required: true,
                default: 1
            },
            price: {
                type: Number,
                required: true
            },
            total_price: {
                type: Number,
                required:true,
            }
        }
    ],
}, 


{ timestamps: true });



const MyBooking = mongoose.model('MyBooking', myBookingSchema);

export default MyBooking;