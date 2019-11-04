import React, {Component} from 'react';
import {Route} from 'react-router-dom'
import {withRouter} from 'react-router-dom'

import CheckoutSummary  from '../../components/Order/CheckoutSummary/CheckoutSummary';
import ContactData from './ContactData/ContactData'

import classes from './Chcekout.css';
import {connect} from "react-redux";

class Checkout extends Component {
    cancelHandler = () => {
        this.props.history.goBack()
    };

    continueHandler = () => {
        this.props.history.push('/checkout/contact')
    };

    render() {
        return (
            <div className={classes.Checkout}>
                <CheckoutSummary
                    ingredients={this.props.ingredients}
                    cancelClicked={this.cancelHandler}
                    continueClicked={this.continueHandler}
                />
                <Route
                    path={`${this.props.match.url}/contact`}
                    exact
                    render={() => (
                        <ContactData />
                    )}
                />
            </div>
        );
    }
}


const mapStateToProps = state => {
    return {
        ingredients: state.burgerBuilder.ingredients,
        price: state.burgerBuilder.price,
    }
};

export default connect(mapStateToProps)(withRouter(Checkout))
