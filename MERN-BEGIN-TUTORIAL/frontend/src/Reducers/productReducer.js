import { PRODUCT_DETAIL_FAIL, PRODUCT_DETAIL_SUCCESS, PRODUCT_LIST_FAIL, PRODUCT_LIST_SUCCESS } from "../Constants/productConstants";

const inittialState = {
    products : [],
    error : false
};
const productListReducer = (state = inittialState, action) => {

    switch (action.type) {
        case PRODUCT_LIST_SUCCESS:
            return {
                products : action.payload
            }
        case PRODUCT_LIST_FAIL:
            return {
                error : action.payload
            }
        default:
            return state;
    }
}

const productDetailReducer = (state = { product : {}}, action) => {

    switch (action.type) {
        case PRODUCT_DETAIL_SUCCESS:
            return {
                product : action.payload
            }
        case PRODUCT_DETAIL_FAIL:
            return {
                error : action.payload
            }
        default:
            return state;
    }
}
export {
    productListReducer,
    productDetailReducer
}