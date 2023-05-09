import  express  from "express";
import aboutUsMissionController from "../controllers/aboutUsMission.controller.js";

const router = express.Router();


router.route('/').get(aboutUsMissionController.getAboutUsMission)
router.route('/').post(aboutUsMissionController.createAboutUsMission);
router.route('/:id').delete(aboutUsMissionController.deleteAboutUsMission)
router.route('/:id').put(aboutUsMissionController.updateAboutUsMission)








export default router;