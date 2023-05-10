import  express  from "express";
import contactUsMainController from "../controllers/contactUsMain.controller.js";
import upload from '../middleware/upload.middleware.js'

const router = express.Router();


router.route('/').get(contactUsMainController.getContactUsMain)
router.route('/').post(upload.single('image'), contactUsMainController.createContactUsMain);
router.route('/:id').delete(contactUsMainController.deleteContactUsMain)
router.route('/:id').put(upload.single('image'),contactUsMainController.updateContactUsMain)








export default router;