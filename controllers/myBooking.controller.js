import e from "express";
import MyBooking from "../models/myBooking.model.js";
import Offers from "../models/offers.model.js";
import User from "../models/user.model.js";

const getBookings = async (req, res) => {
    try {
        const bookings = await MyBooking.find();
        if (!bookings) {
            return res.status(404).json({ message: "no booking" });
        } else {
            return res.status(200).json(bookings);
        }
    } catch (error) {
        console.log(error);
        res.status(500).json({ success: false, message: "Server error" });
    }
};

// Controller function to create or update the cart
const createOrUpdateMyBooking = async (req, res) => {
    const { userId, offers } = req.body;

    try {
        // Check if the user has an existing cart
        const existingBooking = await MyBooking.findOne({ userId });
        if (existingBooking) {
            const total_price =
                parseFloat(offers[0].quantity) * parseFloat(offers[0].price);
            // User has an existing cart
            const newOffer = {
                offerId: offers[0].offerId,
                offerName: offers[0].offerName,
                quantity: offers[0].quantity,
                price: offers[0].price,
                total_price: total_price,
            };
            // Push the new offer to the 'offers' array

            const offersArray = existingBooking.offers;
            offersArray.push(newOffer);
            existingBooking.offers = offersArray;

            // console.log("hello")
            // for(let i = 0;  i < existingBooking.offers.length; i++){
            //     var finalPrice = 0;
            //     finalPrice = finalPrice + existingBooking.offers[i].total_price
            // }
            console.log(existingBooking.finalPrice);
            let price = existingBooking.finalPrice + total_price;
            existingBooking.finalPrice = price;

            await existingBooking.save();
            console.log(existingBooking);

            console.log("New offer pushed to the existing cart:", existingBooking);
            res.status(200).json(existingBooking);
        } else {
            const total_price =
                parseFloat(offers[0].quantity) * parseFloat(offers[0].price);

            // User does not have an existing cart, create a new cart
            const newBooking = new MyBooking({
                userId,
                finalPrice: total_price,
                offers: [
                    {
                        offerId: offers[0].offerId,
                        offerName: offers[0].offerName,
                        quantity: offers[0].quantity,
                        price: offers[0].price,
                        total_price: offers[0].quantity * offers[0].price,
                    },
                ],
            });

            await newBooking.save();

            console.log("New cart created:", newBooking);
            res.status(201).json(newBooking);
        }
    } catch (error) {
        console.error("Error creating/updating MyBooking:", error);
        res
            .status(500)
            .json({ error: "An error occurred while creating/updating the cart" });
    }
};

const deleteMyBooking = async (req, res) => {
    const { id } = req.params;
    try {
        await MyBooking.findByIdAndRemove(id);
        res.status(200).json({
            message: "MyBooking Successfully deleted",
            data: null,
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({
            message: "Failed to delete MyBooking",
        });
    }
};

const getBookingsByUserId = async (req, res) => {
    const userId = req.params.userId;
    try {
        const bookings = await MyBooking.find({ userId: userId });

        if (!bookings) {
            return res
                .status(404)
                .json({ message: "No bookings found for the user" });
        }

        return res.status(200).json(bookings);
    } catch (error) {
        console.error("Error retrieving bookings:", error);
        res
            .status(500)
            .json({ error: "An error occurred while retrieving bookings" });
    }
};

const deleteBookingByUserId = async (req, res) => {
    console.log(req.params);
    const userId = req.params.userId;
    console.log(userId);
    try {
        await MyBooking.deleteOne({ userId: userId });
        res.status(200).json({ message: "Cart successfully deleted" });
    } catch (error) {
        console.error("Error deleting booking:", error);
        res.status(500).json({ error: "An error occurred while deleting booking" });
    }
};

const deleteOfferFromBooking = async (req, res) => {
    const { offerId } = req.params;

    try {
        const booking = await MyBooking.findOne({ "offers.offerId": offerId });

        booking.offers = booking.offers.filter(
            (offer) => offer.offerId !== offerId
        );

        await booking.save();

        console.log("Offer removed from booking:", booking);
        res.status(200).json(booking);
    } catch (error) {
        console.error("Error removing offer from booking:", error);
        res
            .status(500)
            .json({
                error: "An error occurred while removing the offer from the booking",
            });
    }
};

export default {
    getBookings,
    createOrUpdateMyBooking,
    deleteMyBooking,
    getBookingsByUserId,
    deleteBookingByUserId,
    deleteOfferFromBooking,
};
