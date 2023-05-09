import  express  from "express";
import videoDescriptionController from "../controllers/videoDescription.controller.js";
import upload from '../middleware/upload.middleware.js'

const router = express.Router();


router.route('/').get(videoDescriptionController.getVideoDescription)
router.route('/').post(upload.single('imagePhotographer'), videoDescriptionController.createVideoDescription)
router.route('/:id').delete(videoDescriptionController.deleteVideoDescription)
router.route('/:id').put(upload.single('imagePhotographer'), videoDescriptionController.updateVideoDescription)








export default router;