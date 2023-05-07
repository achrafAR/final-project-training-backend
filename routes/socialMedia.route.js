import  express  from "express";
import socialMediaController from "../controllers/socialMedia.controller.js";
import upload from '../middleware/upload.middleware.js'

const router = express.Router();


router.route('/').get(socialMediaController.getSocialMedia)
router.route('/').post(upload.single('image'), socialMediaController.createSocialMedia);
router.route('/:id').delete(socialMediaController.deleteSocialMedia)
router.route('/:id').put(upload.single('image'),socialMediaController.updateSocialMedia)








export default router;