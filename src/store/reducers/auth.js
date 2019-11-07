import * as actions from '../actions/actionTypes'

const initialState = {
    userId: null,
    authToken: null,
    loading: false,
    error: false,
    redirect: '/',
};

const reducer = (state = initialState, {type, payload}) => {
    switch (type) {
        case ( actions.AUTH_START ):
            return {
                ...state,
                loading: true,
            };

        case ( actions.AUTH_SUCCESS ):
            return {
                ...state,
                loading: false,
                authToken: payload.authToken,
                userId: payload.userId,
            };

        case ( actions.AUTH_ERROR ):
            return {
                ...state,
                loading: false,
                error: payload,
            };

        case ( actions.AUTH_SIGN_OUT ):
            return {
                ...state,
                userId: null,
                authToken: null,
            };

        case ( actions.AUTH_SIGN_IN_REDIRECT ):
            return {
                ...state,
                redirect: payload
            };

        default:
            return state;
    }
};

export default reducer