import * as actions from './burgerBuilderActionTypes'

const INGREDIENTS_PRICES = {
    bacon: 1.1,
    salad: 0.4,
    cheese: 0.5,
    meat: 1.3,
};

const initialState = {
    ingredients: {
        bacon: 0,
        salad: 0,
        cheese: 0,
        meat: 0,
    },
    price: 0,
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
        default:
            return state;
    }
};

export default reducer