import {
    ADD_CART_ITEM,
    CART_SAVE_PAYMENT_METHOD,
    CART_SAVE_SHIPPING_ADDRESS,
    REMOVE_CART_ITEM
} from "../actions/types/CartTypes";


const initialState = {
    cartItems: [],
    shippingAddress: {}
}

export const CartReducers = (state = initialState, action) => {
    switch (action.type) {
        case ADD_CART_ITEM:
            const item = action.payload

            const existItem = state.cartItems.find(x => x.product === item.product)
            if(existItem) {
                return {
                    ...state,
                    cartItems: state.cartItems.map(x => x.product === existItem.product ? item : x)
                }
            } else {
                return {
                    ...state,
                    cartItems: [...state.cartItems, item]
                }
            }
        case REMOVE_CART_ITEM:
            return {
                ...state,
                cartItems: state.cartItems.filter(x => x.product !== action.payload)
            }
        case CART_SAVE_SHIPPING_ADDRESS:
            return {...state, shippingAddress: action.payload}
        case CART_SAVE_PAYMENT_METHOD:
            return {...state, paymentMethod: action.payload}
        default:
            return state
    }
}