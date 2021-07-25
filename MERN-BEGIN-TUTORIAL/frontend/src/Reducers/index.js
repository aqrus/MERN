import { combineReducers } from 'redux';
import { cartReducer } from './cartReducer';
import { orderDetailsReducer, orderMineListReducer, orderPayReducer, orderReducer } from './orderReducer';
import { productDetailReducer, productListReducer } from './productReducer';
import { userDetailsReducer, userReducer, userUpdateProfileReducer } from './userReducer';
const rootReducers = combineReducers({
    productList: productListReducer,
    productDetail: productDetailReducer,
    cart: cartReducer,
    user: userReducer,
    userDetail: userDetailsReducer,
    userUpdate: userUpdateProfileReducer,
    order: orderReducer,
    orderDetail: orderDetailsReducer,
    orderPay: orderPayReducer,
    orderMineList: orderMineListReducer
})

export default rootReducers;