import  express  from "express";
import openingController from "../controllers/opening.controller.js";
import upload from '../middleware/upload.middleware.js'

const router = express.Router();


router.route('/').get(openingController.getOpening)
router.route('/').post(upload.array('image',3), openingController.createOpening);
router.route('/:id').delete(openingController.deleteOpening)
router.route('/:id').put(upload.array('image',3),openingController.updateOpening)








export default router;