import React from 'react';
import {BrowserRouter, Switch, Route, Redirect} from 'react-router-dom';
import { connect } from 'react-redux';

import Layout from '../../components/Layout/Layout';

import './App.css';

import asyncComponent from '../../hoc/asyncComponent/asyncComponent';

const  asyncBurgerBuilder =  asyncComponent(() => import('../../containers/BurgerBuilder/BurgerBuilder'));
const  asyncOrders =  asyncComponent(() => import('../Orders/Orders'));
const  asyncCheckout =  asyncComponent(() => import('../Checkout/Checkout'));
const  asyncSignIn =  asyncComponent(() => import('../Auth/SignIn/SignIn'));
const  asyncSignUp =  asyncComponent(() => import('../Auth/SignUp/SignUp'));

const  asyncSignOut =  asyncComponent(() => import('../Auth/SignOut/SignOut'));

const App = props =>  {
    let routes = <Switch>
        <Route
            path={'/'}
            exact
            component={asyncBurgerBuilder}
        />
        <Route
            path={'/orders'}
            component={asyncOrders}
        />
        <Route
            path={'/checkout'}
            component={asyncCheckout}
        />
        <Route
            path={'/signout'}
            component={asyncSignOut}
        />
        <Redirect to={props.redirectAfterAuth}/>
    </Switch>;

    if (!props.isAuth) {
        routes = <Switch>
            <Route
                path={'/'}
                exact
                component={asyncBurgerBuilder}
            />
            <Route
                path={'/signin'}
                exact
                component={asyncSignIn}
            />
            <Route
                path={'/signup'}
                exact
                component={asyncSignUp}
            />
            <Redirect to="/signin"/>
        </Switch>
    }

    return (
        <BrowserRouter>
            <Layout>
                { routes }
            </Layout>
        </BrowserRouter>
    );
};

const mapStateToProps = state => {
    return {
        isAuth: state.auth.authToken !== null,
        redirectAfterAuth: state.auth.redirect,
    }
};

export default connect(mapStateToProps)(App);
