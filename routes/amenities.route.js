import  express  from "express";
import amenitiesController from "../controllers/amenities.controller.js";
import upload from '../middleware/upload.middleware.js'

const router = express.Router();

router.route('/').get(amenitiesController.getAmenities)
router.route('/').post(upload.single('icon'), amenitiesController.createAmenities);
router.route('/:id').delete(amenitiesController.deleteAmenities)
router.route('/:id').put(upload.single('icon'),amenitiesController.updateAmenities)








export default router;