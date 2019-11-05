import * as actions from '../actions/actionTypes'

const initialState = {
    orders: [],
    purchased: false,
    loading: false,
    error: false
};

const reducer = (state = initialState, {type, payload}) => {
    switch (type) {
        case ( actions.PURCHASE_BURGER_INIT ):
            return {
                ...state,
                purchased: false,
            };

        case ( actions.PURCHASE_BURGER_START ):
            return {
                ...state,
                loading: true,
            };

        case ( actions.PURCHASE_BURGER_SUCCESS ):
            return {
                ...state,
                loading: false,
                purchased: true,
            };

        case ( actions.PURCHASE_BURGER_ERROR ):
            return {
                ...state,
                loading: false,
                error: payload,
            };

        case ( actions.FETCH_ORDERS_START ):
            return {
                ...state,
                loading: true,
            };

        case ( actions.FETCH_ORDERS_SUCCESS ):
            return {
                ...state,
                loading: false,
                orders: payload,
            };

        case ( actions.FETCH_ORDERS_ERROR ):
            return {
                ...state,
                loading: false,
                error: payload,
            };

        default:
            return state;
    }
};

export default reducer