import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useHistory } from 'react-router-dom';
import { addToCart, deleteFromCart } from '../../Actions/cartAction';

export default function CartScreen(props) {
    
    const productID = props.match.params.id;
    const query = new URLSearchParams(props.location.search);
    const qty = query.get('qty');
    const goBackURL = useHistory();

    const cart = useSelector((state) => state.cart);
    const { cartItems } = cart;
    const { userInfo } = useSelector((state) => state.user);

    const dispatch = useDispatch();
    useEffect(() =>{
        if(productID){
            dispatch(addToCart(productID, qty))
        }
    },[dispatch, productID, qty])

    const deleteCartItemHandler = (id) => {
        dispatch(deleteFromCart(id))
    }

    
    return (
        <div>
            <button onClick={() => {goBackURL.goBack()}}> Go Back</button>
            <div className="row top">
                <div className="col-2">
                    <h1>Shopping cart</h1>
                    {
                        cartItems.length === 0
                            ?   <div>
                                    <span>Cart is empty</span>
                                    <Link to="/">Go to Shopping</Link>
                                </div>
                              
                            :   <ul>
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
                                                        <select 
                                                            value={item.qty} 
                                                            onChange={e => dispatch(addToCart(item.id, Number(e.target.value)))}
                                                        >
                                                            {
                                                                [...Array(item.countInStock).keys()].map(
                                                                    x => (
                                                                        <option key={x + 1} value={x + 1}>{x + 1}</option>
                                                                    )
                                                                )
                                                            }
                                                        </select>
                                                    </div>
                                                    <div>
                                                        Price:{item.price}
                                                    </div>
                                                    <div>
                                                        <button 
                                                            type="button" 
                                                            onClick={ () => deleteCartItemHandler(item.id) }
                                                        >Delete</button>
                                                    </div>
                                                </div>
                                            </li>
                                        ))
                                    }
                                </ul>
                                
                    }
                </div>
                <div className="col-1">
                    <div className="cart cart-body">
                        <ul>
                            <li>
                                <h2>
                                    (Subtotal total: {cartItems.reduce((a, b) => a + b.qty , 0)} Items) : $
                                    {cartItems.reduce((a, b) => a + b.price * b.qty  , 0)}
                                </h2>
                            </li>
                            <li>
                                {
                                    <Link to={ userInfo ? "/shiping" : "/signin?redirect=shiping"}>
                                        <button 
                                            type="button"
                                            className="primary"
                                            > Proceed to checkout
                                        </button>
                                    </Link>
                                }
                            </li>
                        </ul>
                    </div>
                </div>
            </div>
        </div>
    )
}