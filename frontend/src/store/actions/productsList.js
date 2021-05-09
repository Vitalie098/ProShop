import {
    PRODUCT_CREATE_FAIL,
    PRODUCT_CREATE_REQUEST,
    PRODUCT_CREATE_REVIEW_FAIL,
    PRODUCT_CREATE_REVIEW_REQUEST,
    PRODUCT_CREATE_REVIEW_SUCCESS,
    PRODUCT_CREATE_SUCCESS,
    PRODUCT_DELETE_FAIL,
    PRODUCT_DELETE_REQUEST,
    PRODUCT_DELETE_SUCCESS, PRODUCT_TOP_FAIL, PRODUCT_TOP_REQUEST, PRODUCT_TOP_SUCCESS,
    PRODUCT_UPDATE_FAIL,
    PRODUCT_UPDATE_REQUEST,
    PRODUCT_UPDATE_SUCCESS,
    PRODUCTS_LIST_FAIL,
    PRODUCTS_LIST_REQUEST,
    PRODUCTS_LIST_SUCCESS
} from "./typesActions";
import axios from "axios";
import {logout} from "./userAuth";

export const listProducts = (keyword = "", pageNumber) => async dispatch => {
    try {
        dispatch({type: PRODUCTS_LIST_REQUEST})

        const {data} = await axios.get(`/api/product?keyword=${keyword}&pageNumber=${pageNumber}`)

        dispatch({
            type: PRODUCTS_LIST_SUCCESS,
            payload: data
        })

    } catch (error) {
        const message =
            error.response && error.response.data.message
                ? error.response.data.message
                : error.message
        if (message === 'Not authorized, token failed') {
            dispatch(logout())
        }
        dispatch({
            type: PRODUCTS_LIST_FAIL,
            payload: message
        })
    }
}

export const deleteProduct = id => async (dispatch, getState) => {
    try {
        dispatch({type: PRODUCT_DELETE_REQUEST})

        const {userLogin: {userInfo}} = getState()

        const config = {
            headers: {
                Authorization: `Bearer ${userInfo.token}`
            }
        }

        await axios.delete(`/api/product/${id}`, config)
        dispatch({type: PRODUCT_DELETE_SUCCESS})

    } catch (error) {
        const message =
            error.response && error.response.data.message
                ? error.response.data.message
                : error.message
        if (message === 'Not authorized, token failed') {
            dispatch(logout())
        }
        dispatch({
            type: PRODUCT_DELETE_FAIL,
            payload: message
        })
    }
}

export const createProduct = () => async (dispatch, getState) => {
    try {
        dispatch({type: PRODUCT_CREATE_REQUEST})

        const {userLogin: {userInfo}} = getState()

        const config = {
            headers: {
                Authorization: `Bearer ${userInfo.token}`
            }
        }

        const {data} = await axios.post(`/api/product`, {}, config)

        dispatch({
            type: PRODUCT_CREATE_SUCCESS,
            payload: data
        })

    } catch (error) {
        const message =
            error.response && error.response.data.message
                ? error.response.data.message
                : error.message
        if (message === 'Not authorized, token failed') {
            dispatch(logout())
        }
        dispatch({
            type: PRODUCT_CREATE_FAIL,
            payload: message
        })
    }
}

export const updateProduct = product => async (dispatch, getState) => {
    try {
        dispatch({type: PRODUCT_UPDATE_REQUEST})

        const {userLogin: {userInfo}} = getState()

        const config = {
            headers: {
                Authorization: `Bearer ${userInfo.token}`
            }
        }

        const {data} = await axios.put(`/api/product/${product._id}`, product, config)

        dispatch({
            type: PRODUCT_UPDATE_SUCCESS,
            payload: data
        })

    } catch (error) {
        const message =
            error.response && error.response.data.message
                ? error.response.data.message
                : error.message
        if (message === 'Not authorized, token failed') {
            dispatch(logout())
        }
        dispatch({
            type: PRODUCT_UPDATE_FAIL,
            payload: message
        })
    }
}

export const createReviews = (productId, review) => async (dispatch, getState) => {
    try {
        dispatch({type: PRODUCT_CREATE_REVIEW_REQUEST})

        const {userLogin: {userInfo}} = getState()

        const config = {
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${userInfo.token}`
            }
        }

        await axios.post(`/api/product/${productId}/reviews`, review, config)

        dispatch({ type: PRODUCT_CREATE_REVIEW_SUCCESS })

    } catch (error) {

        console.log(error)
        const message =
            error.response && error.response.data.message
                ? error.response.data.message
                : error.message
        if (message === 'Not authorized, token failed') {
            dispatch(logout())
        }
        console.log("2:    " + message)
        dispatch({
            type: PRODUCT_CREATE_REVIEW_FAIL,
            payload: message
        })
    }
}

export const listTopProducts = () => async dispatch => {
    try {
        dispatch({type: PRODUCT_TOP_REQUEST})

        const { data } = await axios.get("/api/product/top")

        dispatch({
            type: PRODUCT_TOP_SUCCESS,
            payload: data
        })

    } catch (error) {
        const message =
            error.response && error.response.data.message
                ? error.response.data.message
                : error.message
        if (message === 'Not authorized, token failed') {
            dispatch(logout())
        }
        dispatch({
            type: PRODUCT_TOP_FAIL,
            payload: message
        })
    }
}