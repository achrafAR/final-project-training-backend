import  express  from "express";
import ordersController from "../controllers/orders.controller.js";

const router = express.Router();


router.route('/').get(ordersController.getOrders)
router.route('/:id').get(ordersController.getOrderById)
router.route('/').post(ordersController.createOrder);
router.route('/:id').delete(ordersController.deleteOrder)
router.route('/:id').put(ordersController.updateOrder)








export default router;