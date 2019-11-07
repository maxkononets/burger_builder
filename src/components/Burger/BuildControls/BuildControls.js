import React, {useState} from 'react'
import {connect} from 'react-redux';

import classes from './BuildControls.css'
import BuildControl from "./BuildControl/BuildControl";
import PropTypes from 'prop-types'
import * as burgerBuilderActionTypes from "../../../store/actions/actionTypes";
import {Redirect} from "react-router-dom";
import * as actions from "../../../store/actions/auth";

const BuildControls = (props) => {
    const controls = [
        {label: 'Bacon', type: 'bacon',},
        {label: 'Salad', type: 'salad',},
        {label: 'Cheese', type: 'cheese',},
        {label: 'Meat', type: 'meat',},
    ];

    const [isRedirectToSignIn, setIsRedirectToSignIn] = useState(false);

    const signInAndOrder = () => {
        props.onSignInRedirect('/checkout');
        setIsRedirectToSignIn(true)
    };

    return (
        <div className={classes.BuildControls}>
            { isRedirectToSignIn && <Redirect to={'/signin'}/> }
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
            {props.isAuth
                ? <button
                    className={classes.OrderButton}
                    disabled={!props.purchasable}
                    onClick={props.ordered}
                >
                    ORDER
                </button>
                : <button
                    className={classes.OrderButton}
                    disabled={!props.purchasable}
                    onClick={signInAndOrder}
                >
                    SIGN IN AND ORDER
                </button>}
        </div>
    )
};

BuildControls.prototype = {
    ingredientAdded: PropTypes.function,
    ingredientRemoved: PropTypes.function,
    price: PropTypes.float,
};

const mapStateToProps = state => {
    return {
        ings: state.burgerBuilder.ingredients,
        price: state.burgerBuilder.price,
        isAuth: state.auth.authToken !== null,
    }
};

const mapReducersToProps = dispatch => {
    return {
        onSignInRedirect: path => dispatch(actions.signInRedirect(path)),
        onIngredientAdded: ingName => dispatch({type: burgerBuilderActionTypes.ADD_INGREDIENT, payload: {ingName}}),
        onIngredientRemoved: ingName => dispatch({
            type: burgerBuilderActionTypes.REMOVE_INGREDIENT,
            payload: {ingName}
        }),
    }
};

export default connect(mapStateToProps, mapReducersToProps)(BuildControls)