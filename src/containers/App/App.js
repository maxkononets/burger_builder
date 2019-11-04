import React from 'react';
import {BrowserRouter, Switch, Route} from 'react-router-dom'

import Layout from '../../components/Layout/Layout'
import BurgerBuilder from '../../containers/BurgerBuilder/BurgerBuilder'
import Orders from "../Orders/Orders";
import Checkout from "../Checkout/Checkout";

import './App.css';

function App() {
    return (
        <BrowserRouter>
            <Layout>
                <Switch>
                    <Route
                        path={'/'}
                        exact
                        component={BurgerBuilder}
                    />
                    <Route
                        path={'/orders'}
                        component={Orders}
                    />
                    <Route
                        path={'/checkout'}
                        component={Checkout}
                    />
                </Switch>
            </Layout>
        </BrowserRouter>
    );
}

export default App;
