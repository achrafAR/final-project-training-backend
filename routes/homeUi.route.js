import  express  from "express";
import homeUiController from "../controllers/homeUi.controller.js";
import upload from '../middleware/upload.middleware.js'

const router = express.Router();


router.route('/').get(homeUiController.getHomeUi)
router.route('/').post(upload.single('image'), homeUiController.createHomeUi);
router.route('/:id').delete(homeUiController.deleteHomeUi)
router.route('/:id').put(upload.single('image'),homeUiController.updateHomeUi)








export default router;