import { CART_ADD_ITEM, CART_DELETE_ITEM, CART_EMPTY_ITEM, CART_SAVE_PAYMENT_METHOD, CART_SAVE_SHPPING_ADDRESS } from "../Constants/cartConstants"

let initialState = {
    cartItems: localStorage.getItem('cartItems') ? JSON.parse(localStorage.getItem('cartItems')) :[],
    shippingAddress: localStorage.getItem('shippingAddress') ? JSON.parse(localStorage.getItem('shippingAddress')) :{},
    paymentMethod: 'Paypal'
}
export const cartReducer = (state = initialState, action) => {
    switch (action.type) {
        case CART_ADD_ITEM:
            const item = action.payload;
            const existItem = state.cartItems.find(x => x.id === item.id);
            if(existItem) {
                return {
                    ...state,
                    cartItems: state.cartItems.map(x => x.id === existItem.id ? item : x)
                }
            } else {
                return {
                    ...state,
                    cartItems: [...state.cartItems, item]
                }
            }
        case CART_DELETE_ITEM:
            return {
                ...state,
                cartItems: state.cartItems.filter(x => x.id !== action.payload)
            }
        case CART_SAVE_SHPPING_ADDRESS:
            return {
                ...state,
                shippingAddress: action.payload
            }
        case CART_SAVE_PAYMENT_METHOD:
            return {
                ...state,
                paymentMethod: action.payload
            }
        case CART_EMPTY_ITEM:
            return {
                ...state,
                cartItems:[]
            }
        default:
            return state
    }
}
