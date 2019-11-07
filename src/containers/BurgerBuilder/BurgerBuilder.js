import React, {Component} from 'react';
import { connect } from 'react-redux';

import Auxiliary from "../../hoc/Auxiliary/auxiliary";
import Burger from '../../components/Burger/Burger';
import BuildControls from '../../components/Burger/BuildControls/BuildControls';
import OrderSummary from '../../components/Burger/OrderSummary/OrderSummary';
import Modal from '../../components/UI/Modal/Modal';
import Spinner from '../../components/UI/Spinner/Spinner';
import withAxiosErrorHandler from '../../hoc/withAxiosErrorHandler/withAxiosErrorHandler';

import * as burgerBuilderActions from '../../store/actions/burgerBuilder';
import * as orderActions from '../../store/actions/order';

import axios from '../../axios-orders';

class BurgerBuilder extends Component {
    state = {
        purchasable: false,
        purchasing: false,
    };

    componentDidMount() {
        if (!this.props.ings) {
            this.props.initIngredients();
        }
        this.props.purchaseBurgerInit();
    }

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

        let burger = this.props.error ? 'Error' : <Spinner />;
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
        error: state.burgerBuilder.error,
        loading: state.burgerBuilder.loading,
    }
};

const mapReducersToProps = dispatch => {
    return {
        initIngredients: () => dispatch(burgerBuilderActions.initIngredients()),
        purchaseBurgerInit: () => dispatch(orderActions.purchaseBurgerInit()),
    }
};

export default
    connect(mapStateToProps, mapReducersToProps)(
        withAxiosErrorHandler(BurgerBuilder, axios)
    )