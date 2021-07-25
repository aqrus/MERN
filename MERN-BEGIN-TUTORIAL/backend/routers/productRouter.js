const express = require('express');
const data = require('../data');
const expressAsyncHandler = require('express-async-handler');
const { Product } = require('../models/productModel');

const productRouter = express.Router();

productRouter.get('/', expressAsyncHandler(async (req,res) => {
    const Products = await Product.find({});
    res.send(Products);
}));

productRouter.get('/:id',expressAsyncHandler(async (req,res) => {
    const product = await Product.findById(req.params.id);
    product ? res.send(product) : res.status(404).send({message : 'Product Not Found'});
    
}));

module.exports = { productRouter }