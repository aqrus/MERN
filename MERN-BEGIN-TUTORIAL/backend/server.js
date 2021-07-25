const mongoose = require('mongoose');
const userRouter = require('./routers/userRouter');
const express = require('express');
const dotenv = require('dotenv');
const { productRouter } = require('./routers/productRouter');
const orderRouter = require('./routers/orderRouter');

dotenv.config();

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

mongoose.connect('mongodb://localhost:27017/amazona', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true
});

app.use('/api/users', userRouter);
app.use('/api/product', productRouter);
app.use('/api/orders', orderRouter);
app.get('/api/config/paypal', (req, res) => {
    res.send(process.env.PAYPAL_CLIENT_ID || 'sb')
});
app.get('/',(req,res) => {
    res.send('server is ready');
});
app.use((err, req, res, next) => {
    res.status(500).send({message: err.message});
})
app.listen(5000, () => {
    console.log('server at http://localhost:5000')
})
