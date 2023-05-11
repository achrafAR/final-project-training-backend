import  express  from "express";
import reviewController from "../controllers/review.controller.js";

const router = express.Router();


router.route('/').get(reviewController.getAllReviews)
router.route('/').post(reviewController.createReview);
router.route('/:id').delete(reviewController.deleteReview)
router.route('/:id').get(reviewController.getReviewById)








export default router;