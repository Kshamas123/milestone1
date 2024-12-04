const express = require('express');
const menu = require('../data/menu');
const orders = require('../data/orders');
const statusQueue = require('../utils/statusqueue');

const router = express.Router();


router.post('/', (req, res) => {
    const { items } = req.body;

    
    const invalidItems = items.filter(itemId => !menu.find(item => item.id === itemId));
    if (invalidItems.length) {
        return res.status(400).json({ error: "Invalid item IDs: ${invalidItems.join(', ')}"});
    }

    const orderId = orders.length + 1;
    
    const newOrder = { id: orderId, items, status: 'Preparing' ,details:menu[items]};
    orders.push(newOrder);

    
    statusQueue.addOrder(newOrder);

    res.status(201).json({ message: 'Order placed', order: newOrder });
});




router.get('/:id', (req, res) => {
    const orderId = parseInt(req.params.id);
    const order = orders.find(o => o.id === orderId);

    if (!order) {
        return res.status(404).json({ error: 'Order not found' });
    }

    // Map item IDs to menu item details
    const foodDetails = order.items.map(itemId => {
        const menuItem = menu.find(item => item.id === itemId);
        if (menuItem) {
            return { id: menuItem.id, name: menuItem.name, price: menuItem.price, category: menuItem.category };
        }
        return null;
    }).filter(item => item !== null); 

    res.status(200).json({
        id: order.id,
        status: order.status,
        foodItems: foodDetails 
    });
});

module.exports = router;