import React from 'react'
import classes from './BuildControls.css'
import BuildControl from "./BuildControl/BuildControl";
import PropTypes from 'prop-types'

const buildControls = (props) => {
    const controls = [
        {label: 'Bacon', type: 'bacon',},
        {label: 'Salad', type: 'salad',},
        {label: 'Cheese', type: 'cheese',},
        {label: 'Meat', type: 'meat',},
    ]

    return (
        <div className={classes.BuildControls}>
            <p>Current price: <strong>{props.totalPrice.toFixed(2)}</strong></p>
            {controls.map((control, i) => (
                <BuildControl
                    {...control}
                    key={i}
                    added={() => props.ingredientAdded(control.type)}
                    removed={() => props.ingredientRemoved(control.type)}
                    disabled={props.disabled[control.type]}
                />
                ))}
            <button
                className={classes.OrderButton}
                disabled={!props.purchasable}
                onClick={props.ordered}
            >
                ORDER
            </button>
        </div>
    )
}

buildControls.prototype = {
    ingredientAdded: PropTypes.function,
    ingredientRemoved: PropTypes.function,
    price: PropTypes.float,
}

export default buildControls