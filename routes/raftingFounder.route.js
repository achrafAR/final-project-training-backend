import  express  from "express";
import RaftingFounderController from "../controllers/raftingFounder.controller.js";

const router = express.Router();


router.route('/').get(RaftingFounderController.getRaftingFounder)
router.route('/').post(RaftingFounderController.createRaftingFounder);
router.route('/:id').delete(RaftingFounderController.deleteRaftingFounder)
router.route('/:id').put(RaftingFounderController.updateRaftingFounder)








export default router;