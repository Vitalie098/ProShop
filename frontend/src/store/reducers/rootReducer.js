import {combineReducers} from "redux"
import {
        ProductCreateReducers,
        ProductDeleteReducers,
        ProductListReducers, ProductReviewsCreateReducer, ProductsTopReducer,
        ProductUpdateReducers
} from "./ProductsListReducers";
import {ProductDetailsReducer} from "./ProductDetailsReducer";
import {CartReducer} from "./CartReducer";
import {UserLoginReducer} from "./UserLoginReducer";
import {UserRegisterReducer} from "./UserRegisterReducer";
import {UserDetailsReducer} from "./UserDetailsReducer";
import {
        userDeleteReducer,
        userListReducer,
        UserUpdateProfileReducer,
        userUpdateReducer
} from "./UserUpdateProfileReducer";
import {
        OrderCreateReducer,
        OrderDetailsReducer,
        OrderPayReducer,
        OrderListMyReducer,
        OrderListReducer, OrderDeliverReducer
} from "./OrderReducer";

export const rootReducers = combineReducers({
        productsList: ProductListReducers,
        productDetails: ProductDetailsReducer,
        cart: CartReducer,
        userLogin: UserLoginReducer,
        userRegister: UserRegisterReducer,
        userDetails: UserDetailsReducer,
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