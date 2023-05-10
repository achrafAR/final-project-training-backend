import  express  from "express";
import offersMainController from "../controllers/offersMain.controller.js";
import upload from '../middleware/upload.middleware.js'

const router = express.Router();


router.route('/').get(offersMainController.getOffersMain)
router.route('/').post(upload.single('image'), offersMainController.createOffersMain);
router.route('/:id').delete(offersMainController.deleteOffersMain)
router.route('/:id').put(upload.single('image'),offersMainController.updateOffersMain)








export default router;