import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { combineReducers, createStore, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';

import './index.css';
import App from './containers/App/App';
import * as serviceWorker from './serviceWorker';

import burgerBuilder from './store/reducers/burgerBuilder';
import order from './store/reducers/order';
import auth from './store/reducers/auth';

const reducers = combineReducers({
    burgerBuilder,
    order,
    auth,
});

const persistState = store => {
    return next => {
        return action => {
            console.log(store.getState());
            const res = next(action);
            localStorage.setItem('store', JSON.stringify(store.getState()));
            return res
        }
    }
};

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const store = createStore(
    reducers,
    JSON.parse(localStorage.getItem('store')) || {},
    composeEnhancers(applyMiddleware(
        persistState,
        thunk,
    ))
);

ReactDOM.render(<Provider store={store} ><App/></Provider>, document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
