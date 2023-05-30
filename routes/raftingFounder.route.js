import  express  from "express";
import RaftingFounderController from "../controllers/raftingFounder.controller.js";
import upload from '../middleware/upload.middleware.js'

const router = express.Router();


router.route('/').get(RaftingFounderController.getRaftingFounder)
router.route('/').post(upload.single('image'),RaftingFounderController.createRaftingFounder);
router.route('/:id').delete(RaftingFounderController.deleteRaftingFounder)
router.route('/:id').put(upload.single('image'),RaftingFounderController.updateRaftingFounder)








export default router;