import axios from "axios"
import { CART_ADD_ITEM, CART_DELETE_ITEM, CART_SAVE_PAYMENT_METHOD, CART_SAVE_SHPPING_ADDRESS } from "../Constants/cartConstants";

export const addToCart = (productID, qty) => async (dispatch, getState) => {
    const {data} = await axios.get(`/api/product/${productID}`);

    dispatch({
        type: CART_ADD_ITEM,
        payload: {
            name: data.name,
            id: data._id,
            image: data.image,
            price: data.price,
            countInStock: data.countInStock,
            qty: qty
        }
    });

    localStorage.setItem('cartItems', JSON.stringify(getState().cart.cartItems))
}

export const deleteFromCart = (productID) => (dispatch, getState) => {
    console.log(productID);
    dispatch({
        type: CART_DELETE_ITEM,
        payload: productID
    });
    localStorage.setItem('cartItems', JSON.stringify(getState().cart.cartItems))
}

export const saveShippingAddress = (data) => (dispatch) => {
    dispatch({
        type: CART_SAVE_SHPPING_ADDRESS,
        payload: data
    });

    localStorage.setItem('shippingAddress', JSON.stringify(data))
}

export const savePaymentMethod = (data) => (dispatch) => {
    dispatch({
        type: CART_SAVE_PAYMENT_METHOD,
        payload: data
    });
}