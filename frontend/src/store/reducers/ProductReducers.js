import {
    PRODUCT_CREATE_FAIL,
    PRODUCT_CREATE_REQUEST,
    PRODUCT_CREATE_RESET,
    PRODUCT_CREATE_REVIEW_FAIL,
    PRODUCT_CREATE_REVIEW_REQUEST,
    PRODUCT_CREATE_REVIEW_RESET,
    PRODUCT_CREATE_REVIEW_SUCCESS,
    PRODUCT_CREATE_SUCCESS,
    PRODUCT_DELETE_FAIL,
    PRODUCT_DELETE_REQUEST,
    PRODUCT_DELETE_RESET,
    PRODUCT_DELETE_SUCCESS,
    PRODUCT_TOP_FAIL,
    PRODUCT_TOP_REQUEST,
    PRODUCT_TOP_SUCCESS,
    PRODUCT_UPDATE_FAIL,
    PRODUCT_UPDATE_REQUEST,
    PRODUCT_UPDATE_RESET,
    PRODUCT_UPDATE_SUCCESS,
    PRODUCTS_DETAILS_FAIL,
    PRODUCTS_DETAILS_REQUEST,
    PRODUCTS_DETAILS_SUCCESS,
    PRODUCTS_LIST_FAIL,
    PRODUCTS_LIST_REQUEST,
    PRODUCTS_LIST_SUCCESS
} from "../actions/types/productsTypes";

const initialState = {
    product: [],
    loading: false,
    error: null
}

export const ProductReducers = (state = initialState, action) => {
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

export const ProductListReducers = (state = initialState, action) => {
    switch (action.type) {
        case PRODUCTS_LIST_REQUEST:
            return {...state,loading: true, products: []}
        case PRODUCTS_LIST_SUCCESS:
            return {...state, loading: false,
                products: action.payload.products,
                page: action.payload.page,
                pages: action.payload.pages
            }
        case PRODUCTS_LIST_FAIL:
            return {...state, loading: false, error: action.payload}
        default:
            return state
    }
}

export const ProductDeleteReducers = (state = {}, action) => {
    switch (action.type) {
        case PRODUCT_DELETE_REQUEST:
            return {loading: true}
        case PRODUCT_DELETE_SUCCESS:
            return {loading: false, success: true}
        case PRODUCT_DELETE_FAIL:
            return {loading: false, error: action.payload}
        case PRODUCT_DELETE_RESET:
            return {}
        default:
            return state
    }
}

export const ProductCreateReducers = (state = {}, action) => {
    switch (action.type) {
        case PRODUCT_CREATE_REQUEST:
            return {loading: true}
        case PRODUCT_CREATE_SUCCESS:
            return {loading: false, success: true, product: action.payload}
        case PRODUCT_CREATE_FAIL:
            return {loading: false, error: action.payload}
        case PRODUCT_CREATE_RESET:
            return {}
        default:
            return state
    }
}

export const ProductUpdateReducers = (state = {product: {}}, action) => {
    switch (action.type) {
        case PRODUCT_UPDATE_REQUEST:
            return {loading: true}
        case PRODUCT_UPDATE_SUCCESS:
            return {loading: false, success: true, product: action.payload}
        case PRODUCT_UPDATE_FAIL:
            return {loading: false, error: action.payload}
        case PRODUCT_UPDATE_RESET:
            return {product: {}}
        default:
            return state
    }
}

export const ProductReviewsCreateReducer = (state = {}, action) => {
    switch (action.type) {
        case PRODUCT_CREATE_REVIEW_REQUEST:
            return { loading: true }
        case PRODUCT_CREATE_REVIEW_SUCCESS:
            return { loading: false, success: true }
        case PRODUCT_CREATE_REVIEW_FAIL:
            return { loading: false, error: action.payload}
        case PRODUCT_CREATE_REVIEW_RESET:
            return {}
        default:
            return state
    }
}

export const ProductsTopReducer = (state = { products: []}, action) => {
    switch (action.type) {
        case PRODUCT_TOP_REQUEST:
            return { loading: true, products: []}
        case PRODUCT_TOP_SUCCESS:
            return { loading: false, products: action.payload }
        case PRODUCT_TOP_FAIL:
            return { loading: false, error: action.payload}
        default:
            return state
    }
}

