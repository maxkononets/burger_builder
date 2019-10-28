import React from 'react'
import classes from './OrderSummary.css'
import Button from '../../../containers/UI/Button/Button'

const orderSummary = props => {
    const ingredientSummary = Object.keys(props.ingredients)
        .map((igKey, i) => {
            return (
                <li key={i}>
                    <span
                        style={{textTransform: 'capitalize'}}
                    >
                        {igKey}
                    </span>
                    : <strong>{props.ingredients[igKey]}</strong>
                </li>
            )
        })

    return (
        <div className={classes.OrderSummary}>
            <h3>Your order</h3>
            <p>A delicious burger with following ingredients:</p>
            <ul>
                {ingredientSummary}
            </ul>
            <p>Total price: <strong>{props.price.toFixed(2)}</strong></p>
            <p>Continue to Checkout?</p>
            <Button
                type="Danger"
                clicked={props.purchaseCancelled}
            >
                Cancel
            </Button>
            <Button
                type="Success"
                clicked={props.purchaseContinued}
            >
                Continue
            </Button>
        </div>
    )
}

export default orderSummary