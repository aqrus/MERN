import axios from "axios";
import { PRODUCT_DETAIL_FAIL, PRODUCT_DETAIL_SUCCESS, PRODUCT_LIST_FAIL, PRODUCT_LIST_SUCCESS } from "../Constants/productConstants";

export const getListProduct = () => async (dispatch) => {
    try {
        const { data } = await axios.get('/api/product');
        dispatch({
            type: PRODUCT_LIST_SUCCESS,
            payload: data
        });
    } catch (error) {
        dispatch({
            type: PRODUCT_LIST_FAIL,
            payload: error.message
        });
    }
}

export const getDetailProduct = (productID) => async (dispatch) => {
    try {
        const { data } = await axios.get(`/api/product/${productID}`);
        dispatch({
            type : PRODUCT_DETAIL_SUCCESS,
            payload : data
        });
    }
    catch (error){
        dispatch({
            type : PRODUCT_DETAIL_FAIL,
            payload :  error.response.data.message
        });
    }
}