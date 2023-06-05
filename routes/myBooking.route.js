import  express  from "express";
import myBookingController from "../controllers/myBooking.controller.js";

const router = express.Router();


router.route('/').get(myBookingController.getBookings)
router.route('/').post(myBookingController.createOrUpdateMyBooking);
router.route('/:id').delete(myBookingController.deleteMyBooking)
router.route('/:userId').get(myBookingController.getBookingsByUserId)
router.route('/user/:userId').delete(myBookingController.deleteBookingByUserId)
router.route(':userId/:offerId').delete(myBookingController.deleteOfferFromBooking)








export default router;