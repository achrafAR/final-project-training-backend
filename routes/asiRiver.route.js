import  express  from "express";
import asiRiverController from "../controllers/asiRiver.controller.js";
import upload from '../middleware/upload.middleware.js'


const router = express.Router();


router.route('/').get(asiRiverController.getAsiRiver)
router.route('/').post(upload.array('image',4),asiRiverController.createAsiRiver);
router.route('/:id').delete(asiRiverController.deleteAsiRiver)
router.route('/:id').put(upload.array('image',4),asiRiverController.updateAsiRiver)








export default router;