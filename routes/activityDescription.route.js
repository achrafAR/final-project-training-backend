import  express  from "express";
import activityDescriptionController from "../controllers/activityDescription.controller.js";
import upload from '../middleware/upload.middleware.js'

const router = express.Router();


router.route('/').get(activityDescriptionController.getActivityDescription)
router.route('/').post(upload.single('image'), activityDescriptionController.createActivityDescription);
router.route('/:id').delete(activityDescriptionController.deleteActivityDescription)
router.route('/:id').put(upload.single('image'),activityDescriptionController.updateActivityDescription)








export default router;