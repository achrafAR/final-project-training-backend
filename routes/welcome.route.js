import  express  from "express";
import welcomeController from "../controllers/welcome.controller.js";

const router = express.Router();


router.route('/').get(welcomeController.getWelcome)
router.route('/').post(welcomeController.createWelcome);
router.route('/:id').delete(welcomeController.deleteWelcome)
router.route('/:id').put(welcomeController.updateWelcome)








export default router;