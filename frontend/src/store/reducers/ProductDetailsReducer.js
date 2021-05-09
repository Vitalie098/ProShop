import {
    PRODUCTS_DETAILS_REQUEST,
    PRODUCTS_DETAILS_SUCCESS,
    PRODUCTS_DETAILS_FAIL
} from "../actions/typesActions";

const initialState = {
    product: [],
    loading: false,
    error: null
}

export const ProductDetailsReducer = (state = initialState, action) => {
    switch (action.type) {
        case PRODUCTS_DETAILS_REQUEST:
            return {...state, loading: true}
        case PRODUCTS_DETAILS_SUCCESS:
            return {...state, loading: false, product: action.payload}
        case PRODUCTS_DETAILS_FAIL:
            return {...state, loading: false, error: action.payload}
        default:
            return state
    }
}

