import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { savePaymentMethod } from '../../Actions/cartAction';
export default function PaymentMethodScreen(props) {

    const { shippingAddress } = useSelector(state => state.cart);
    if(!shippingAddress.address){
        props.history.push('/shiping');
    }

    const [paymentMethod, setPaymentMethod] = useState('paypal');

    const dispatch = useDispatch();
    const onSubmitHandler = (e) => {
        e.preventDefault();
        dispatch(savePaymentMethod(paymentMethod));
        props.history.push('/placeorder');
    }
    return (
        <div>
            <form className="form" onSubmit={onSubmitHandler}>
                <div>
                    <h1>Payment</h1>
                </div>
                <div>
                    <div>
                        <input
                            type="radio"
                            id="paypal"
                            value="paypal"
                            name="paymentMethod"
                            required
                            checked
                            onChange={(e) => setPaymentMethod(e.target.value)}
                        ></input>
                        <label htmlFor="paypal">Paypal</label>
                    </div>
                    <div>
                        <input
                            type="radio"
                            id="stripe"
                            value="stripe"
                            name="paymentMethod"
                            required
                            checked
                            onChange={(e) => setPaymentMethod(e.target.value)}
                        ></input>
                        <label htmlFor="stripe">Stripe</label>
                    </div>
                    <div>
                        <button className="primary" type="submit">Continue</button>
                    </div>
                </div>
            </form>
            
        </div>
    )
}
