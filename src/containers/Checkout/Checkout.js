import React, {Component} from 'react';
import {Route} from 'react-router-dom'
import {withRouter} from 'react-router-dom'
import qs from 'qs'

import CheckoutSummary  from '../../components/Order/CheckoutSummary/CheckoutSummary';
import ContactData from './ContactData/ContactData'

import classes from './Chcekout.css';

class Checkout extends Component {
    state = {
        ingredients: {},
        price: 0,
    };

    componentDidMount() {
        const ingredients = qs.parse(this.props.location.search, {
            ignoreQueryPrefix: true,
        });
        for (const ingredient in ingredients) {
            ingredients[ingredient] = parseInt(ingredients[ingredient])
        }

        this.setState({ ingredients })
    }

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
                    ingredients={this.state.ingredients}
                    cancelClicked={this.cancelHandler}
                    continueClicked={this.continueHandler}
                />
                <Route
                    path={`${this.props.match.url}/contact`}
                    exact
                    render={() => (
                        <ContactData
                            ingredients={this.state.ingredients}
                            price={this.state.price}
                        />
                    )}
                />
            </div>
        );
    }
}

export default withRouter(Checkout);