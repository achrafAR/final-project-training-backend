import  express  from "express";
import aboutUsValueController from "../controllers/aboutUsValue.controller.js";
import upload from '../middleware/upload.middleware.js'

const router = express.Router();


router.route('/').get(aboutUsValueController.getAboutUsValue)
router.route('/').post(upload.single('image'), aboutUsValueController.createAboutUsValue);
router.route('/:id').delete(aboutUsValueController.deleteAboutUsValue)
router.route('/:id').put(upload.single('image'),aboutUsValueController.updateAboutUsValue)








export default router;