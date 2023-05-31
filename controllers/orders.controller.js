import Order from '../models/orders.model.js';


const createOrder = async (req, res) => {
    try {
        const { userId, name, phoneNumber, date, totalAmount, offers } = req.body;

        const newOrder = new Order({
            userId,
            name,
            phoneNumber,
            date,
            totalAmount,
            offers,
        });

        const savedOrder = await newOrder.save();
        res.status(201).json(savedOrder);
    } catch (error) {
        console.error('Error creating order:', error);
        res.status(500).json({ error: 'Failed to create order' });
    }
};


const getOrders = async (req, res) => {
    try {
        const orders = await Order.find();
        res.status(200).json(orders);
    } catch (error) {
        console.error('Error retrieving orders:', error);
        res.status(500).json({ error: 'Failed to retrieve orders' });
    }
};


const getOrderById = async (req, res) => {
    const { id } = req.params;
    try {
        const order = await Order.findById(id);
        if (!order) {
            return res.status(404).json({ message: 'Order not found' });
        }
        res.status(200).json(order);
    } catch (error) {
        console.error('Error retrieving order:', error);
        res.status(500).json({ error: 'Failed to retrieve order' });
    }
};



const updateOrder = async (req, res) => {
    const { id } = req.params;
    const { userId, name, phoneNumber, date, totalAmount, offers } = req.body;

    try {
        const updatedOrder = await Order.findByIdAndUpdate(
            id,
            { userId, name, phoneNumber, date, totalAmount, offers },
            { new: true }
        );

        if (!updatedOrder) {
            return res.status(404).json({ message: 'Order not found' });
        }

        res.status(200).json(updatedOrder);
    } catch (error) {
        console.error('Error updating order:', error);
        res.status(500).json({ error: 'Failed to update order' });
    }
};





const deleteOrder = async (req, res) => {
    const { id } = req.params;

    try {
        const deletedOrder = await Order.findByIdAndDelete(id);

        if (!deletedOrder) {
            return res.status(404).json({ message: 'Order not found' });
        }

        res.status(200).json({ message: 'Order deleted successfully' });
    } catch (error) {
        console.error('Error deleting order:', error);
        res.status(500).json({ error: 'Failed to delete order' });
    }
};






export default {
    deleteOrder,
    createOrder,
    getOrderById,
    getOrders,
    updateOrder,
}