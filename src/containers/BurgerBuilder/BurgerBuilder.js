import React, {Component} from 'react'
import Auxiliary from "../../hoc/Auxiliary/auxiliary"
import Burger from '../../components/Burger/Burger'
import BuildControls from '../../components/Burger/BuildControls/BuildControls'
import OrderSummary from '../../components/Burger/OrderSummary/OrderSummary'
import Modal from '../UI/Modal/Modal'
import Spinner from '../UI/Spinner/Spinner'
import withAxiosErrorHandler from '../../hoc/withAxiosErrorHandler/withAxiosErrorHandler'

import axios from '../../axios-orders'

const INGREDIENTS_PRICES = {
    salad: 0.4,
    cheese: 0.5,
    meat: 1.3,
    bacon: 1.1,
};

class BurgerBuilder extends Component {
    state = {
        ingredients: null,
        totalPrice: 0,
        purchasable: false,
        purchasing: false,
        loading: false,
        error: false
    };

    componentDidMount() {
        axios.get('/ingredients.json')
            .then(response => this.setState({
                ingredients: response.data
            })).catch(() => this.setState({
                error: true
            }))
    }

    updatePurchasable = () => {
        let sum = Object.values(this.state.ingredients)
            .reduce((sum, igKey) => {
                return sum + igKey
            }, 0);

        this.setState({
            purchasable: sum > 0
        })
    };

    purchaseHandler = () => {
        this.setState({purchasing: true})
    };


    purchaseCancelHandler = () => {
        this.setState({purchasing: false})
    };

    // purchaseContinueHandler = () => {
        // this.setState({ loading: true });
        //
        // const orderObject = {
        //     ingredients: this.state.ingredients,
        //     price: this.state.totalPrice,
        //     customer: {
        //         name: 'Max',
        //         address: {
        //             zipCode: '2131',
        //             country: 'Ukraine',
        //         },
        //         email: 'mail@mail.com'
        //     },
        //     deliveryMethod: 'UkrPost'
        // };
        // axios.post(
        //     'orders.json',
        //     orderObject
        // ).then(response => {
        //     this.setState({
        //         loading: false,
        //         purchasing: false,
        //     })
        // }).catch(response => {
        //     this.setState({
        //         loading: false,
        //         purchasing: false,
        //     })
        // })
    // };

    addIngredientHandler = (type) => {
        this.setState({
            ingredients: {
                ...this.state.ingredients,
                [type]: this.state.ingredients[type] + 1
            },
            totalPrice: this.state.totalPrice + INGREDIENTS_PRICES[type]
        }, this.updatePurchasable);
    };

    removeIngredientHandler = (type) => {
        this.setState({
            ingredients: {
                ...this.state.ingredients,
                [type]: this.state.ingredients[type] - 1
            },
            totalPrice: this.state.totalPrice - INGREDIENTS_PRICES[type]
        }, this.updatePurchasable);
    };

    render() {
        const disabledControls = {...this.state.ingredients};

        for (let key in disabledControls) {
            disabledControls[key] = !disabledControls[key]
        }

        let burger = this.state.error ? 'Error' : <Spinner />;
        let orderSummary = <Spinner/>;

        if (this.state.ingredients) {
            burger = (
                <Auxiliary>
                    <Burger ingredients={this.state.ingredients}/>
                    <BuildControls
                        totalPrice={this.state.totalPrice}
                        ingredientAdded={this.addIngredientHandler}
                        ingredientRemoved={this.removeIngredientHandler}
                        ordered={this.purchaseHandler}
                        disabled={disabledControls}
                        purchasable={this.state.purchasable}
                    />
                </Auxiliary>
            );

            if (!this.state.loading) {
                orderSummary = <OrderSummary
                    price={this.state.totalPrice}
                    purchaseCancelled={this.purchaseCancelHandler}
                    purchaseContinued={this.purchaseContinueHandler}
                    ingredients={this.state.ingredients}
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

export default withAxiosErrorHandler(BurgerBuilder, axios)