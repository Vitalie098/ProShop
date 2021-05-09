import {PRODUCTS_DETAILS_FAIL, PRODUCTS_DETAILS_REQUEST, PRODUCTS_DETAILS_SUCCESS} from "./typesActions";
import axios from "axios";
import {logout} from "./userAuth";

export const listProductDetails = id => async dispatch => {
    try{
        dispatch({type: PRODUCTS_DETAILS_REQUEST})

        const {data} = await axios.get(`/api/product/${id}`)
        dispatch({
            type: PRODUCTS_DETAILS_SUCCESS,
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
            type: PRODUCTS_DETAILS_FAIL,
            payload: message
        })
    }
}