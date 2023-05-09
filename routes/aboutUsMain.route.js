import  express  from "express";
import aboutUsMainController from "../controllers/aboutUsMain.controller.js";
import upload from '../middleware/upload.middleware.js'

const router = express.Router();


router.route('/').get(aboutUsMainController.getAboutUsMain)
router.route('/').post(upload.single('image'), aboutUsMainController.createAboutUsMain);
router.route('/:id').delete(aboutUsMainController.deleteAboutUsMain)
router.route('/:id').put(upload.single('image'),aboutUsMainController.updateAboutUsMain)








export default router;