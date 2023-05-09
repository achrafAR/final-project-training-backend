import  express  from "express";
import homeUiController from "../controllers/homeUi.controller.js";
import upload from '../middleware/upload.middleware.js'

const router = express.Router();


router.route('/').get(homeUiController.getHomeUi)
router.route('/').post(upload.array('image',4), homeUiController.createHomeUi);
router.route('/:id').delete(homeUiController.deleteHomeUi)
router.route('/:id').put(upload.array('image',4),homeUiController.updateHomeUi)








export default router;