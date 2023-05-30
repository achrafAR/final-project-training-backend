import  express  from "express";
import welcomeController from "../controllers/welcome.controller.js";
import upload from '../middleware/upload.middleware.js'

const router = express.Router();


router.route('/').get(welcomeController.getWelcome)
router.route('/').post(upload.single('image'),welcomeController.createWelcome);
router.route('/:id').delete(welcomeController.deleteWelcome)
router.route('/:id').put(upload.single('image'),welcomeController.updateWelcome)








export default router;