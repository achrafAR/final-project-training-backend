import  express  from "express";
import myBookingController from "../controllers/myBooking.controller.js";
import upload from '../middleware/upload.middleware.js'

const router = express.Router();


router.route('/').get(myBookingController.getBookings)
router.route('/').post(myBookingController.createOrUpdateMyBooking);
router.route('/:id').delete(myBookingController.deleteMyBooking)
// router.route('/:id').put(myBookingController.updateBooking)








export default router;