import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { combineReducers, createStore } from 'redux';

import './index.css';
import App from './containers/App/App';
import * as serviceWorker from './serviceWorker';

import burgerBuilder from './store/reducers/burgerBuilder/burgerBuilder'

const reducers = combineReducers({
    burgerBuilder,
});

const store = createStore(reducers);

ReactDOM.render(<Provider store={store} ><App/></Provider>, document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
