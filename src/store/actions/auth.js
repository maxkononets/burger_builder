import * as actions from './actionTypes';
import axios from 'axios';
import * as firebase from '../../config/firebase'

export const authStart = () => {
    return {
        type: actions.AUTH_START,
    }
};

export const authSuccess = (userId, authToken) => {
    return {
        type: actions.AUTH_SUCCESS,
        payload: {userId, authToken}
    }
};

export const authError = error => {
    return {
        type: actions.AUTH_ERROR,
        payload: error
    }
};

export const signOut = () => {
    return {
        type: actions.AUTH_SIGN_OUT
    }
};

export const checkAuthTimeout = (expiresAt) => {
    return dispatch => {
        setTimeout(() => {
            dispatch(signOut())
        }, expiresAt * 1000 )
    }
};

export const signInRedirect = path => {
    return  {
        type: actions.AUTH_SIGN_IN_REDIRECT,
        payload: path
    }
};

export const signIn = (email, password) => {
    return dispatch => {
        dispatch(authStart());

        axios.post(
            `https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=${firebase.appKey}`,
            {email, password, returnSecureToken: true}
        )
            .then(response => {
                dispatch(authSuccess(
                    response.data[firebase.uidIdentifier],
                    response.data[firebase.authTokenIdentifier]
                ));
                dispatch(checkAuthTimeout(response.data[firebase.expireInIdentifier]))
            })
            .catch(error => {
                dispatch(authError(error.response ? error.response.data.error.message : error.message))
            })
    };
};

export const signUp = (email, password) => {
    return dispatch => {
        dispatch(authStart());

        axios.post(
            `https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=${firebase.appKey}`,
            {email, password, returnSecureToken: true}
        )
            .then(response => {
                dispatch(authSuccess(
                    response.data[firebase.uidIdentifier],
                    response.data[firebase.authTokenIdentifier]
                ));
                dispatch(checkAuthTimeout(response.data[firebase.expireInIdentifier]))
            })
            .catch(error => {
                dispatch(authError(error.response ? error.response.data.error.message : error.message))
            })
    }
};