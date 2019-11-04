import React from 'react'
import {Link} from 'react-router-dom'
import qs from 'qs'
import { connect } from 'react-redux';

import Button from '../../UI/Button/Button'

import classes from './OrderSummary.css'

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
            <Link to={'/checkout'}>
                <Button
                    type="Success"
                >
                    Continue
                </Button>
            </Link>
        </div>
    )
}

const mapStateToProps = state => {
    return {
        ingredients: state.burgerBuilder.ingredients,
        price: state.burgerBuilder.price,
    }
};

export default connect(mapStateToProps)(orderSummary)