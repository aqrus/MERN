import { ORDER_CREATE_FAIL, ORDER_CREATE_RESET, ORDER_CREATE_SUCCESS, ORDER_DETAIL_FAIL, ORDER_DETAIL_REQUEST, ORDER_DETAIL_SUCCESS, ORDER_MINE_LIST_FAIL, ORDER_MINE_LIST_REQUEST, ORDER_MINE_LIST_SUCCESS, ORDER_PAY_FAIL, ORDER_PAY_REQUEST, ORDER_PAY_RESET, ORDER_PAY_SUCCESS } from "../Constants/orderConstant";
const initialorderDetails = {
    orderDetail:{
        shippingAddress:{},
        orderItems:[],
        itemsPrice:0,
        shippingFee:0,
        taxFee:0,
        totalPrice:0
    }
}
export const orderReducer = (state = {}, action) => {
    switch ( action.type ) {
        case ORDER_CREATE_SUCCESS:
            return {
                success: true,
                order: action.payload
            }
        case ORDER_CREATE_FAIL:
            return {
                success: false,
                error: action.payload
            }
        case ORDER_CREATE_RESET:
            return {}
        default:
            return state;
    }
}

export const orderDetailsReducer = (state = initialorderDetails, action) => {
    switch (action.type) {
        case ORDER_DETAIL_REQUEST:
          return { loading: true };
        case ORDER_DETAIL_SUCCESS:
          return { loading: false, orderDetail: action.payload };
        case ORDER_DETAIL_FAIL:
          return { loading: false, error: action.payload };
        default:
          return state;
      }
}

export const orderPayReducer = (state = {}, action) => {
    switch (action.type) {
        case ORDER_PAY_REQUEST:
            return {
                loadingPay: true
            }
        case ORDER_PAY_SUCCESS: 
            return {
                loadingPay: true,
                successPay: true
            }
        case ORDER_PAY_FAIL:
            return {
                errorPay: action.payload
            }
        case ORDER_PAY_RESET:
            return {}
        default:
           return state;
    }
}

export const orderMineListReducer = (state = {orders:[]}, action) => {
    switch (action.type) {
        case ORDER_MINE_LIST_REQUEST:
          return {
              loading: true
          }
        case ORDER_MINE_LIST_SUCCESS:
            return {
                loading: false,
                orders: action.payload
            }
        case ORDER_MINE_LIST_FAIL:
            return {
                loading: false,
                error: action.payload
            }
        default:
            return state;
    }
}