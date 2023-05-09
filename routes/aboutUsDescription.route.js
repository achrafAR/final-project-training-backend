import  express  from "express";
import aboutUsDescriptionController from "../controllers/aboutUsDescription.controller.js";
import upload from '../middleware/upload.middleware.js'

const router = express.Router();


router.route('/').get(aboutUsDescriptionController.getAboutUsDescription)
router.route('/').post(upload.single('image'), aboutUsDescriptionController.createAboutUsDescription);
router.route('/:id').delete(aboutUsDescriptionController.deleteAboutUsDescription)
router.route('/:id').put(upload.single('image'),aboutUsDescriptionController.updateAboutUsDescription)








export default router;