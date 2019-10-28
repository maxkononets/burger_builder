import React, {Component} from 'react'
import Auxiliary from "../../hoc/auxiliary"
import Burger from '../../components/Burger/Burger'
import BuildControls from '../../components/Burger/BuildControls/BuildControls'
import OrderSummary from '../../components/Burger/OrderSummary/OrderSummary'
import Modal from '../UI/Modal/Modal'

const INGREDIENTS_PRICES = {
    salad: 0.4,
    cheese: 0.5,
    meat: 1.3,
    bacon: 1.1,
}

class BurgerBuilder extends Component {
    state = {
        ingredients: {
            bacon: 0,
            salad: 0,
            cheese: 0,
            meat: 0,
        },
        totalPrice: 0,
        purchasable: false,
        purchasing: false,
    }

    updatePurchasable = () => {
        let sum = Object.values(this.state.ingredients)
            .reduce((sum, igKey) => {
                return sum + igKey
            }, 0)

        this.setState({
            purchasable: sum > 0
        })
    }

    purchaseHandler = () => {
        this.setState({purchasing: true})
    }


    purchaseCancelHandler = () => {
        this.setState({purchasing: false})
    }

    purchaseContinueHandler = () => {
        alert('continued')
    }

    addIngredientHandler = (type) => {
        this.setState({
            ingredients: {
                ...this.state.ingredients,
                [type]: this.state.ingredients[type] + 1
            },
            totalPrice: this.state.totalPrice + INGREDIENTS_PRICES[type]
        }, this.updatePurchasable);
    }

    removeIngredientHandler = (type) => {
        this.setState({
            ingredients: {
                ...this.state.ingredients,
                [type]: this.state.ingredients[type] - 1
            },
            totalPrice: this.state.totalPrice - INGREDIENTS_PRICES[type]
        }, this.updatePurchasable);
    }

    render() {
        const disabledControls = {...this.state.ingredients}

        for (let key in disabledControls) {
            disabledControls[key] = ! disabledControls[key]
        }

        return (
            <Auxiliary>
                <Burger ingredients={this.state.ingredients} />
                <Modal show={this.state.purchasing} modalClosed={this.purchaseCancelHandler}>
                    <OrderSummary
                        price={this.state.totalPrice}
                        purchaseCancelled={this.purchaseCancelHandler}
                        purchaseContinued={this.purchaseContinueHandler}
                        ingredients={this.state.ingredients}
                    />
                </Modal>
                <BuildControls
                    totalPrice={this.state.totalPrice}
                    ingredientAdded={this.addIngredientHandler}
                    ingredientRemoved={this.removeIngredientHandler}
                    ordered={this.purchaseHandler}
                    disabled={disabledControls}
                    purchasable={this.state.purchasable}
                />
            </Auxiliary>
        )
    }
}

export default BurgerBuilder