import  express  from "express";
import contactUsDetailsController from "../controllers/contactUsDetails.controller.js";
import upload from '../middleware/upload.middleware.js'

const router = express.Router();


router.route('/').get(contactUsDetailsController.getContactUsDetails)
router.route('/').post(upload.single('image'), contactUsDetailsController.createContactUsDetails);
router.route('/:id').delete(contactUsDetailsController.deleteContactUsDetails)
router.route('/:id').put(upload.single('image'),contactUsDetailsController.updateContactUsDetails)








export default router;