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

const reducers = combineReducers({
    burgerBuilder,
    order,
});

const logger = store => {
    return next => {
        return action => {
            const res = next(action);
            localStorage.setItem('store', JSON.stringify(store.getState()));
            return res
        }
    }
};

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const store = createStore(
    reducers,
    composeEnhancers(applyMiddleware(
        logger,
        thunk,
    ))
);

ReactDOM.render(<Provider store={store} ><App/></Provider>, document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
