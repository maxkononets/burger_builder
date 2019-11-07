import React, {Component} from 'react';
import {Route} from 'react-router-dom'
import {withRouter, Redirect} from 'react-router-dom'

import CheckoutSummary  from '../../components/Order/CheckoutSummary/CheckoutSummary';

import classes from './Chcekout.css';
import {connect} from "react-redux";
import asyncComponent from "../../hoc/asyncComponent/asyncComponent";

const  asyncContactData =  asyncComponent(() => import('./ContactData/ContactData'));

class Checkout extends Component {
    cancelHandler = () => {
        this.props.history.goBack()
    };

    continueHandler = () => {
        this.props.history.push('/checkout/contact')
    };

    render() {
        let summary = (<Redirect to={'/'} />);

        if (this.props.ingredients) {
            const purchasedRedirect = this.props.purchased && <Redirect to={'/'} />;
            summary = (<div className={classes.Checkout}>
                { purchasedRedirect }
                <CheckoutSummary
                    ingredients={this.props.ingredients}
                    cancelClicked={this.cancelHandler}
                    continueClicked={this.continueHandler}
                />
                <Route
                    path={`${this.props.match.url}/contact`}
                    exact
                    component={asyncContactData}
                />
            </div>);
        }
        return summary;
    }
}


const mapStateToProps = state => {
    return {
        ingredients: state.burgerBuilder.ingredients,
        price: state.burgerBuilder.price,
        purchased: state.order.purchased,
    }
};

export default connect( mapStateToProps )( withRouter( Checkout ) )
