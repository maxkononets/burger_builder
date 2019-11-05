import * as actions from '../actions/actionTypes'

const INGREDIENTS_PRICES = {
    bacon: 1.1,
    salad: 0.4,
    cheese: 0.5,
    meat: 1.3,
};

const initialState = {
    ingredients: null,
    price: 0,
    loading: false,
    error: false
};

const reducer = (state = initialState, {type, payload}) => {
    switch (type) {
        case ( actions.ADD_INGREDIENT ):
            return {
                ...state,
                ingredients: {
                    ...state.ingredients,
                    [payload.ingName]: state.ingredients[payload.ingName] + 1,
                },
                price: state.price + INGREDIENTS_PRICES[payload.ingName],
            };

        case ( actions.REMOVE_INGREDIENT ):
            return {
                ...state,
                ingredients: {
                    ...state.ingredients,
                    [payload.ingName]: state.ingredients[payload.ingName] - 1,
                },
                price: state.price - INGREDIENTS_PRICES[payload.ingName],
            };

        case ( actions.FLUSH_INGREDIENTS ):
            const ingredients = {...state.ingredients};
            for ( let ing in ingredients) {
                ingredients[ing] = 0;
            }
            return {
                ...state,
                ingredients,
                price: 0,
            };

        case ( actions.SET_INGREDIENTS ):
            const ings = payload.ingredients;
            let price = 0;

            for ( let ing in ings) {
                price += ings[ing] * INGREDIENTS_PRICES[ing];
            }
            return {
                ...state,
                ingredients: ings,
                price,
            };

        case ( actions.SET_LOADING ):
            return {
                ...state,
                loading: payload,
            };

        case ( actions.SET_ERROR_ON_LOADING ):
            return {
                ...state,
                error: payload,
            };

        default:
            return state;
    }
};

export default reducer