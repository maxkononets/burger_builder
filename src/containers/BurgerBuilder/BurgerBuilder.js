import React, {Component} from 'react';
import { connect } from 'react-redux';

import Auxiliary from "../../hoc/Auxiliary/auxiliary";
import Burger from '../../components/Burger/Burger';
import BuildControls from '../../components/Burger/BuildControls/BuildControls';
import OrderSummary from '../../components/Burger/OrderSummary/OrderSummary';
import Modal from '../../components/UI/Modal/Modal';
import Spinner from '../../components/UI/Spinner/Spinner';
import withAxiosErrorHandler from '../../hoc/withAxiosErrorHandler/withAxiosErrorHandler';

import axios from '../../axios-orders';

class BurgerBuilder extends Component {
    state = {
        // ingredients: null,
        // totalPrice: 0,
        purchasable: false,
        purchasing: false,
        loading: false,
        error: false
    };

    // componentDidMount() {
        // axios.get('/ingredients.json')
        //     .then(response => this.setState({
        //         ingredients: response.data
        //     })).catch(() => this.setState({
        //         error: true
        //     }))
    // }

    updatePurchasable = (ingredients) => {
        let sum = Object.values(ingredients)
            .reduce((sum, igKey) => {
                return sum + igKey
            }, 0);

        return sum > 0;
    };

    purchaseHandler = () => {
        this.setState({purchasing: true})
    };


    purchaseCancelHandler = () => {
        this.setState({purchasing: false})
    };

    render() {
        const disabledControls = {...this.props.ings};

        for (let key in disabledControls) {
            disabledControls[key] = !disabledControls[key]
        }

        let burger = this.state.error ? 'Error' : <Spinner />;
        let orderSummary = <Spinner/>;

        if (this.props.ings) {
            burger = (
                <Auxiliary>
                    <Burger/>
                    <BuildControls
                        ordered={this.purchaseHandler}
                        disabled={disabledControls}
                        purchasable={this.updatePurchasable(this.props.ings)}
                    />
                </Auxiliary>
            );

            if (!this.state.loading) {
                orderSummary = <OrderSummary
                    purchaseCancelled={this.purchaseCancelHandler}
                    purchaseContinued={this.purchaseContinueHandler}
                />;
            }
        }


        return (
            <Auxiliary>
                <Modal show={this.state.purchasing} modalClosed={this.purchaseCancelHandler}>
                    {orderSummary}
                </Modal>
                {burger}
            </Auxiliary>
        )
    }
}

const mapStateToProps = state => {
    return {
        ings: state.burgerBuilder.ingredients,
        price: state.burgerBuilder.price,
    }
};

export default
connect(mapStateToProps)(
    withAxiosErrorHandler(BurgerBuilder, axios)
)