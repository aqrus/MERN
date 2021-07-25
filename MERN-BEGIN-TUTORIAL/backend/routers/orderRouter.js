const express = require("express");
const expressAsyncHandler = require("express-async-handler");
const { Order } = require("../models/orderModel");
const { isAuth } = require("../ultis");

const orderRouter = express.Router();

orderRouter.post(
    '/',
    isAuth,
    expressAsyncHandler(async (req, res) => {
        if(req.body.orderItems.length === 0) {
            res.status(404).send({ message: 'Cart is empty'})
        } else {
            const order = new Order({
                orderItems: req.body.orderItems,
                shippingAddress: req.body.shippingAddress,
                paymentMethod: req.body.paymentMethod,
                itemsPrice: req.body.itemsPrice,
                shippingFee: req.body.shippingFee,
                taxFee: req.body.taxFee,
                totalPrice: req.body.totalPrice,
                user: req.user._id
            });
            const createOrder = await order.save();
            res.status(201).send({ message: 'New Order Created', order: createOrder })
        }
}));

orderRouter.get(
    '/mine',
    isAuth,
    expressAsyncHandler(async (req, res) => {
        const orders = await Order.find({ user: req.user._id });
        res.send(orders)
    })
);

orderRouter.get(
    '/:id',
    isAuth,
    expressAsyncHandler(async (req, res) => {
        const order = await Order.findById(req.params.id);
        if( order ) {
            res.send(order);
        } else {
            res.status(404).send({ message: 'Order not faund'})
        }
    })
);

orderRouter.put(
    '/:id/pay',
    isAuth,
    expressAsyncHandler(async (req, res) => {
        const order = await Order.findById(req.params.id);
        if(order){
            order.isPaid = true;
            order.paidAt = Date.now();
            order.paymentResult = {
                id: req.body.id,
                status: req.body.status,
                update_time: req.body.update_time,
                email_address: req.body.email_address
            }
            const orderUpdate = await order.save(order);
            res.send({message: "Order Is Paid", order: orderUpdate});
        } else {
            res.status(404).send({message: 'Order not found'});
        }
    })
    
)
module.exports = orderRouter;