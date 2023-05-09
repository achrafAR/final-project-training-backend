import  express  from "express";
import featuresController from "../controllers/features.controller.js";

const router = express.Router();


router.route('/').get(featuresController.getFeatures)
router.route('/').post(featuresController.createFeatures);
router.route('/:id').delete(featuresController.deleteFeatures)
router.route('/:id').put(featuresController.updateFeatures)








export default router;