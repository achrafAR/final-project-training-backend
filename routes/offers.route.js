import  express  from "express";
import offersController from "../controllers/offers.controller.js";
import upload from '../middleware/upload.middleware.js'

const router = express.Router();


router.route('/').get(offersController.getOffers)
router.route('/').post(upload.single('image'), offersController.createOffers);
router.route('/:id').delete(offersController.deleteOffers)
router.route('/:id').put(upload.single('image'),offersController.updateOffers)
router.route('/:id').get(upload.single('image'),offersController.getOffer)








export default router;