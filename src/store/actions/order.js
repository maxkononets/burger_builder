import * as actions from './actionTypes'
import * as burgerBuilderActions from './burgerBuilder'

import axios from "../../axios-orders";

export const purchaseBurger = (orderData, token) => {
    return dispatch => {
        dispatch(purchaseBurgerStart());

        axios.post('/orders.json', orderData,{
            params: {
                auth: token
            }
        })
            .then(response => {
                dispatch(purchaseBurgerSuccess(response.data.name, orderData));
                dispatch(burgerBuilderActions.flushIngredients());
            })
            .catch(error => {
                dispatch(purchaseBurgerError(error));
            });
    }
};

export const purchaseBurgerInit = () => {
    return {
        type: actions.PURCHASE_BURGER_INIT,
    }
};

export const purchaseBurgerStart = error => {
    return {
        type: actions.PURCHASE_BURGER_START,
        payload: error,
    }
};

export const purchaseBurgerSuccess = (id, orderData) => {
    return {
        type: actions.PURCHASE_BURGER_SUCCESS,
        payload: {
            id,
            orderData,
        }
    }
};

export const purchaseBurgerError = error => {
    return {
        type: actions.PURCHASE_BURGER_SUCCESS,
        payload: error
    }
};

export const fetchOrders = (token, userId) => {
    return dispatch => {
        dispatch(fetchOrdersStart());

        axios.get('orders.json', {
            params: {
                auth: token,
                orderBy: '"userId"',
                equalTo: `"${userId}"`
            }
        })
            .then(response => {
                let transformedOrders = [];
                for (let orderId in response.data) {
                    transformedOrders.push({
                        id: orderId,
                        ...response.data[orderId],
                    })
                }
                dispatch(fetchOrdersSuccess(transformedOrders));
            })
            .catch(error => {
                dispatch(fetchOrdersError(error));
            })
    }
};

export const fetchOrdersStart = () => {
    return {
        type: actions.FETCH_ORDERS_START,
    }
};

export const fetchOrdersSuccess = orders => {
    return {
        type: actions.FETCH_ORDERS_SUCCESS,
        payload: orders,
    }
};

export const fetchOrdersError = error => {
    return {
        type: actions.FETCH_ORDERS_ERROR,
        payload: error,
    }
};


