import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import "./bootstrap.min.css"
import App from './App';
import reportWebVitals from './reportWebVitals';
import {createStore,applyMiddleware} from "redux"
import thunk from "redux-thunk"
import {composeWithDevTools} from "redux-devtools-extension"
import {Provider} from "react-redux"
import {rootReducers} from "./store/reducers/rootReducer";

const cartItemsFromStorage = localStorage.getItem("cartItems") ?
    JSON.parse(localStorage.getItem("cartItems"))
    : []

const userInfoFromStorage = localStorage.getItem("userInfo") ?
    JSON.parse(localStorage.getItem("userInfo"))
    : null

const shippingAddressFromStorage = localStorage.getItem("shippingAddress") ?
    JSON.parse(localStorage.getItem("shippingAddress"))
    : {}


const initialState = {
    cart: {
        cartItems: cartItemsFromStorage,
        shippingAddress: shippingAddressFromStorage
    },
    userLogin: {userInfo: userInfoFromStorage}
}
const store = createStore(rootReducers, initialState,  composeWithDevTools(applyMiddleware(thunk)) )

ReactDOM.render(
    <Provider store={store}>
        <React.StrictMode>
            <App />
        </React.StrictMode>
    </Provider>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
