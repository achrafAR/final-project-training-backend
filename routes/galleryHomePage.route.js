import  express  from "express";
import galleryHomePageController from "../controllers/galleryHomePage.controller.js";
import upload from '../middleware/upload.middleware.js'

const router = express.Router();


router.route('/').get(galleryHomePageController.getGalleryHomePage)
router.route('/').post(upload.single('image'), galleryHomePageController.createGalleryHomePage);
router.route('/:id').delete(galleryHomePageController.deleteGalleryHomePage)
router.route('/:id').put(upload.single('image'),galleryHomePageController.updateGalleryHomePage)








export default router;