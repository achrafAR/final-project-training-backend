import  express  from "express";
import aboutUsTeamController from "../controllers/aboutUsTeam.controller.js";
import upload from '../middleware/upload.middleware.js'

const router = express.Router();


router.route('/').get(aboutUsTeamController.getAboutUsTeam)
router.route('/').post(upload.single('image'), aboutUsTeamController.createAboutUsTeam);
router.route('/:id').delete(aboutUsTeamController.deleteAboutUsTeam)
router.route('/:id').put(upload.single('image'),aboutUsTeamController.updateAboutUsTeam)








export default router;