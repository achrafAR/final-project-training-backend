import Review from "../models/review.model.js";

// POST reviews
export const createReview = async (req, res) => {
    try {
        const { name, description, userId } = req.body;

        const newReview = new Review({ name, description, userId });
        const createdReview = await newReview.save();

        res.status(201).json(createdReview);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Server Error" });
    }
};

// GET All Reviews
export const getAllReviews = async (req, res) => {
    try {
        const reviews = await Review.find();
        res.status(200).json(reviews);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Server Error" });
    }
};

// GET reviews/:id
export const getReviewById = async (req, res) => {
    try {
        const { id } = req.params;
        const review = await Review.findById(id).populate("userId ");
        if (!review) {
            res.status(404).json({ message: "Review not found" });
        } else {
            res.status(200).json(review);
        }
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Server Error" });
    }
};


// DELETE reviews
export const deleteReview = async (req, res) => {
    try {
        const { id } = req.params;
        const existingReview = await Review.findById(id);
        if (!existingReview) {
            res.status(404).json({ message: "Review not found" });
        } else {
            await existingReview.remove();
            res.status(200).json({ message: "Review deleted" });
        }
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Server Error" });
    }
};

export default {
    createReview,
    getAllReviews,
    getReviewById,
    deleteReview

}