import express from "express";
import aboutUsController from "../controllers/aboutUs.controller.js";
import upload from '../middleware/upload.middleware.js'

const router = express.Router();


router.route('/').get(aboutUsController.getAboutUs)
router.route('/').post(upload.any([
    { name: 'background'},
    { name: 'imageValue'},
    { name: 'imageTeam'},
]), aboutUsController.createAboutUs); 
router.route('/:id').delete(aboutUsController.deleteAboutUs)
router.route('/:id').put(upload.array('image'), aboutUsController.updateAboutUs)








export default router;