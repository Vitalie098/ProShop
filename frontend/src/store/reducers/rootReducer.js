import {combineReducers} from "redux"
import {
        ProductCreateReducers,
        ProductDeleteReducers,
        ProductListReducers,
        ProductReviewsCreateReducer,
        ProductsTopReducer,
        ProductUpdateReducers,
        ProductReducers

} from "./ProductReducers";
import {CartReducers} from "./CartReducers";
import {
        UserReducers,
        UserUpdateProfileReducer,
        UserRegisterReducer,
        UserLoginReducer,
        userListReducer,
        userUpdateReducer,
        userDeleteReducer
} from "./UserReducers";

import {
        OrderCreateReducer,
        OrderDetailsReducer,
        OrderPayReducer,
        OrderListMyReducer,
        OrderListReducer,
        OrderDeliverReducer
} from "./OrderReducers";

export const rootReducers = combineReducers({
        productsList: ProductListReducers,
        productDetails: ProductReducers,
        cart: CartReducers,
        userLogin: UserLoginReducer,
        userRegister: UserRegisterReducer,
        userDetails: UserReducers,
        userUpdateProfile: UserUpdateProfileReducer,
        orderCreate: OrderCreateReducer,
        orderDetails: OrderDetailsReducer,
        orderPay: OrderPayReducer,
        orderListMy: OrderListMyReducer,
        userList: userListReducer,
        userDelete: userDeleteReducer,
        userUpdate: userUpdateReducer,
        productDelete: ProductDeleteReducers,
        productCreate: ProductCreateReducers,
        productUpdate: ProductUpdateReducers,
        orderList: OrderListReducer,
        orderDeliver: OrderDeliverReducer,
        productReviewsCreate: ProductReviewsCreateReducer,
        productsTop: ProductsTopReducer
})