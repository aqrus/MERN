import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router-dom';
import { createOrder } from '../../Actions/orderAction';
import { ORDER_CREATE_RESET } from '../../Constants/orderConstant';
import ErrorMessageBox from '../Message/ErrorMessageBox';

export default function PlaceOrderScreen(props) {

    const cart = useSelector(state => state.cart);
    const { shippingAddress, paymentMethod, cartItems } = cart;
    if(!cart) {
        props.history.push('/payment');
    }

    const { success, order, error } = useSelector(state => state.order)

    const toPrice = (num) => Number(num.toFixed(2)) // 5.123 => "5.12" => 5.12
    const itemsPrice = toPrice(cartItems.reduce((a, b) => a + b.price * b.qty, 0));
    const shippingFee = itemsPrice > 100 ? toPrice(0) : toPrice(100);
    const taxFee = toPrice(0.15 * itemsPrice);
    const totalPrice = itemsPrice + shippingFee + taxFee;

    const dispatch = useDispatch();

    const PlaceOrderhandler = () => {
        dispatch(createOrder({...cart, itemsPrice, shippingFee, taxFee, totalPrice ,orderItems: cartItems }));
    }

    useEffect(() => {
        if(success){
            props.history.push(`/order/${order._id}`);
            dispatch({type: ORDER_CREATE_RESET})
        }
    }, [dispatch, order, props.history, success])
    return (
        <div>
            <div className="row top">
                <div className="col-2">
                    <ul>
                        <li>
                            <div className="card card-body">
                                <h2>Shipping</h2>
                                <p>
                                    <strong>Name:</strong> {shippingAddress.fullName} <br/>
                                    <strong>Address</strong> {shippingAddress.address},
                                    {shippingAddress.city}, {shippingAddress.postalCode},
                                    {shippingAddress.country}
                                </p>
                            </div>
                        </li>
                        <li>
                            <div className="card card-body">
                                <h2>Payment</h2>
                                <p>
                                    <strong>Method:</strong> {paymentMethod}
                                </p>
                            </div>
                        </li>
                        <li>
                            <div className="card card-body">
                                <h2>Order Items</h2>
                                <ul>
                                    {
                                        cartItems.map((item) => (
                                            <li key={item.id}>
                                                <div className="row">
                                                    <div>
                                                        <img
                                                            src={item.image}
                                                            alt={item.name}
                                                            className="small"
                                                        ></img>
                                                    </div>
                                                    <div className="min-30">
                                                        <Link to={`/product/${item.id}`}>{item.name}</Link>
                                                    </div>
                                                    <div>
                                                        {item.qty} x {item.price} = ${ item.qty * item.price }
                                                    </div>
                                                </div>
                                            </li>
                                        ))
                                    }
                                </ul>
                            </div>
                        </li>
                    </ul>
                </div>
                <div className="col-1">
                    <div className="card card-body">
                        <ul>
                            <li>
                                <h2>Order Sumary</h2>
                            </li>
                            <li>
                                <div className="row">
                                    <div>Items</div>
                                    <div>${itemsPrice.toFixed(2)}</div>
                                </div>
                            </li>
                            <li>
                                <div className="row">
                                    <div>Shipping</div>
                                    <div>${shippingFee.toFixed(2)}</div>
                                </div>
                            </li>
                            <li>
                                <div className="row">
                                    <div>Tax</div>
                                    <div>${taxFee.toFixed(2)}</div>
                                </div>
                            </li>
                            <li>
                                <div className="row">
                                    <div><strong>Total Order</strong></div>
                                    <div><strong>${totalPrice.toFixed(2)}</strong></div>
                                </div>
                            </li>
                            <li>
                                <button 
                                    type="button" 
                                    className="primary"
                                    onClick={PlaceOrderhandler}
                                    disabled={cart.cartItems === 0}
                                >Place Order</button>
                            </li>
                            { error && <ErrorMessageBox variant="danger" message={error}></ErrorMessageBox> }
                        </ul>
                    </div>
                </div>
            </div>
        </div>
    )
}
