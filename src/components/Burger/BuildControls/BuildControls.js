import React from 'react'
import { connect } from 'react-redux';

import classes from './BuildControls.css'
import BuildControl from "./BuildControl/BuildControl";
import PropTypes from 'prop-types'
import * as burgerBuilderActionTypes from "../../../store/actions/actionTypes";

const buildControls = (props) => {
    const controls = [
        {label: 'Bacon', type: 'bacon',},
        {label: 'Salad', type: 'salad',},
        {label: 'Cheese', type: 'cheese',},
        {label: 'Meat', type: 'meat',},
    ]

    return (
        <div className={classes.BuildControls}>
            <p>Current price: <strong>{props.price.toFixed(2)}</strong></p>
            {controls.map((control, i) => (
                <BuildControl
                    {...control}
                    key={i}
                    added={() => props.onIngredientAdded(control.type)}
                    removed={() => props.onIngredientRemoved(control.type)}
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

const mapStateToProps = state => {
    return {
        ings: state.burgerBuilder.ingredients,
        price: state.burgerBuilder.price,
    }
};

const mapReducersToProps = dispatch => {
    return {
        onIngredientAdded: ingName => dispatch({type: burgerBuilderActionTypes.ADD_INGREDIENT, payload: {ingName}}),
        onIngredientRemoved: ingName => dispatch({type: burgerBuilderActionTypes.REMOVE_INGREDIENT, payload: {ingName}}),
    }
};

export default connect(mapStateToProps, mapReducersToProps)(buildControls)