// Import the necessary modules and dependencies
import mongoose from 'mongoose';

// Define the Order schema
const orderSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    name: {
        type: String,
        required: true
    },
    phoneNumber: {
        type: String,
        required: true
    },
    date: {
        type: Date,
        required: true
    },
    totalAmount: {
        type: Number,
        required: true
    },
    offers: [{
        offerName: {
            type: String,
            required: true
        },
        quantity: {
            type: Number,
            required: true
        },
        total_price: {
            type: Number,
            required: true
        }
        // You can add more fields specific to offers if needed
    }],
    // You can add more fields specific to orders if needed
});

// Create the Order model based on the schema
const Order = mongoose.model('Order', orderSchema);

export default Order;