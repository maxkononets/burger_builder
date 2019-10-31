import React from 'react';
import {BrowserRouter, Switch, Route} from 'react-router-dom'

import './App.css';
import Layout from '../../components/Layout/Layout'
import BurgerBuilder from '../../containers/BurgerBuilder/BurgerBuilder'

import Checkout from "../Checkout/Checkout";

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
                        path={'/checkout'}
                        component={Checkout}
                    />
                </Switch>
            </Layout>
        </BrowserRouter>
    );
}

export default App;
