import * as actions from './actionTypes';

import axios from '../../axios-orders';

export const setIngredients = (ingredients) => ({
    type: actions.SET_INGREDIENTS,
    payload: {
        ingredients,
    }
});

export const setLoading = value => ({
    type: actions.SET_LOADING,
    payload: value,
});

export const setErrorOnLoading = value => ({
    type: actions.SET_ERROR_ON_LOADING,
    payload: value,
});

export const initIngredients = () => dispatch => {
    dispatch(setLoading(true));

    axios.get('/ingredients.json')
        .then(response => {
            dispatch(setLoading(false));
            dispatch(setIngredients(response.data))
        })
        .catch(error => {
            dispatch(setLoading(false));
            dispatch(setErrorOnLoading(true));
        })
};

export const flushIngredients = () => ({type: actions.FLUSH_INGREDIENTS});