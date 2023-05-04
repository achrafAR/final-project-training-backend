import  express  from "express";
import popularController from "../controllers/popular.controller.js";
import upload from '../middleware/upload.middleware.js'

const router = express.Router();


router.route('/').get(popularController.getPopular)
router.route('/').post(upload.single('image'), popularController.createPopular);
router.route('/:id').delete(popularController.deletePopular)
router.route('/:id').put(upload.single('image'),popularController.updatePopular)








export default router;