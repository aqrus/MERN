import { ORDER_CREATE_FAIL, ORDER_CREATE_SUCCESS, ORDER_DETAIL_FAIL, ORDER_DETAIL_SUCCESS, ORDER_MINE_LIST_FAIL, ORDER_MINE_LIST_REQUEST, ORDER_MINE_LIST_SUCCESS, ORDER_PAY_FAIL, ORDER_PAY_REQUEST, ORDER_PAY_SUCCESS } from "../Constants/orderConstant";
import axios from "axios";
import { CART_EMPTY_ITEM } from "../Constants/cartConstants";

export const createOrder = (order) => async (dispatch, getState) => {
    
    try {
        const { user: { userInfo }} = getState();
        const { data } = await axios.post(
            '/api/orders',
            order,
            {
                headers: {
                    Authorization: `Bearer ${userInfo.token}`
                }
            }
        );
        dispatch({
            type: ORDER_CREATE_SUCCESS,
            payload: data.order
        })
        dispatch({ type: CART_EMPTY_ITEM })
        localStorage.removeItem('cartItems');
    } catch (error) {
        dispatch({
            type: ORDER_CREATE_FAIL,
            payload: error.response && error.response.data.message ? error.response.data.message : error.message
        })
    }
    
}

export const detailOrder = (orderId) => async (dispatch, getState) => {
    const { user: { userInfo }} = getState();
    try {
        const { data } = await axios.get(`/api/orders/${orderId}`, {
            headers: { Authorization: `Bearer ${userInfo.token}` }
          });
        dispatch({
            type: ORDER_DETAIL_SUCCESS,
            payload: data
        })
    } catch (error) {

        dispatch({
            type: ORDER_DETAIL_FAIL,
            payload: error.response && error.response.data.message ? error.response.data.message : error.message
        });
    }
}

export const payOrder = (order, paymentResult) => async (dispatch, getState) => {
    dispatch({
        type: ORDER_PAY_REQUEST,
        payload: paymentResult
    });
    const { user: { userInfo }} = getState();

    try {
        const { data } = axios.put(
            `/api/orders/${order._id}/pay`,
            paymentResult,
            {
                headers: { Authorization: `Bearer ${userInfo.token}` }
            });
        dispatch({
            type: ORDER_PAY_SUCCESS,
            payload: data
        });
    } catch (error) {
        dispatch({
            type: ORDER_PAY_FAIL,
            payload: error.response && error.response.data.message ? error.response.data.message : error.message
        });
    }
}

export const listOrderMine = () => async (distpatch, getState) =>{
    const { user: { userInfo }} = getState();
    
    distpatch({
        type:ORDER_MINE_LIST_REQUEST
    })
    try {
        const { data } = await axios.get(
            `/api/orders/mine`,
            {
                headers: { Authorization: `Bearer ${userInfo.token}` }
            }
        )
        distpatch({
            type: ORDER_MINE_LIST_SUCCESS,
            payload: data
        });
    } catch (error) {
        distpatch({
            type: ORDER_MINE_LIST_FAIL,
            payload: error.response && error.response.data.message ? error.response.data.message : error.message
        });
    }

}