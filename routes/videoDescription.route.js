import  express  from "express";
import videoDescriptionController from "../controllers/videoDescription.controller.js";
import upload from '../middleware/upload.middleware.js'

const router = express.Router();


router.route('/').get(videoDescriptionController.getVideoDescription)
router.route('/').post(upload.fields([{ name: 'imagePhotographer',maxCount:1 }, { name: 'video',maxCount:1 }]), videoDescriptionController.createVideoDescription)
router.route('/:id').delete(videoDescriptionController.deleteVideoDescription)
router.route('/:id').put(upload.fields([{ name: 'image' }, { name: 'video' }]), videoDescriptionController.updateVideoDescription)








export default router;