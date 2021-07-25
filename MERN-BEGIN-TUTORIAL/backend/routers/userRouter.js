const express = require('express');
const expressAsyncHandler = require('express-async-handler');
const { User } = require('../models/UserModel');
const bcrypt = require('bcryptjs');
const { generateToken, isAuth } = require('../ultis');
const userRouter  = express.Router();

userRouter.post('/signin', expressAsyncHandler(async (req, res) => {
    const user = await User.findOne({ email: req.body.email });
    if(user){
        if(bcrypt.compareSync(req.body.password, user.password)){
            res.send({
                _id: user._id,
                name: user.name,
                email: user.email,
                token: generateToken(user)
            });
            return;
        }
        res.status(404).send({message: 'Invalid password'})
    }
    res.status(404).send({message: 'Invalid email'})
}))

userRouter.post('/register', expressAsyncHandler(async (req, res) => {
    const user = new User({
        name: req.body.name,
        email: req.body.email,
        password: bcrypt.hashSync(req.body.password,8)
    });
    const createUser = await user.save();

    res.send({
        _id: user._id,
        name: user.name,
        email: user.email,
        token: generateToken(createUser)
    });
}))

userRouter.get(
    '/:id',
    isAuth,
    expressAsyncHandler( async (req, res) => {
        const user = await User.findById(req.user._id)
        if(user){
            res.send(user)
        } else {
            res.status(404).send({message:'User not fauld'});
        }
    })
)

userRouter.put(
    '/profile',
    isAuth,
    expressAsyncHandler( async (req, res) => {
        const user = await User.findById(req.user._id);
        if(user){
            user.name = req.body.name || user.name;
            user.email = req.body.email || user.email;
            if(req.body.password){
                user.password = bcrypt.hashSync(req.body.password, 8);
            }
            const updateUser = user.save();
            res.send({
                _id: user._id,
                name: user.name,
                email: user.email,
                token: generateToken(updateUser)
            });
        } else {
            res.status(404).send({message:'User not fauld'});
        }
    })
)
module.exports = userRouter;