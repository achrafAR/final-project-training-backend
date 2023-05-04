import  express  from "express";
import PagesController from "../controllers/pages.controller.js";

const router = express.Router();


router.route('/').get(PagesController.getPages)
router.route('/').post(PagesController.createPages);
router.route('/:id').delete(PagesController.deletePages)
router.route('/:id').put(PagesController.updatePages)








export default router;