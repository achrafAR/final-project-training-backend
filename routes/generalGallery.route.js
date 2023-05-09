import  express  from "express";
import generalGalleryController from "../controllers/generalGallery.controller.js";
import upload from '../middleware/upload.middleware.js'

const router = express.Router();


router.route('/').get(generalGalleryController.getGeneralGallery)
router.route('/').post(upload.array('image',10), generalGalleryController.createGeneralGallery);
router.route('/:id').delete(generalGalleryController.deleteGeneralGallery)
router.route('/:id').put(upload.array('image',10),generalGalleryController.updateGeneralGallery)








export default router;