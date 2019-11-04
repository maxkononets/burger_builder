import React from 'react'
import { connect } from 'react-redux';

import BurgerIngredient from './BurgerIngredient/BurgerIngredient'
import classes from './Burger.css'

const burger = props => {
    let transformedIngredients = Object.keys(props.ingredients)
        .map(igKey => {
            return [...Array(props.ingredients[igKey])].map((_, i) => {
                return <BurgerIngredient key={igKey + i} type={igKey} />
            })
        })
        .reduce((arr, el) => arr.concat(...el), [])

    if (transformedIngredients.length === 0) {
        transformedIngredients = <p>Please, start adding ingredients</p>
    }

    return (
        <div className={classes.Burger}>
            <BurgerIngredient type="bread-top" />
            {transformedIngredients}
            <BurgerIngredient type="bread-bottom" />
        </div>
    )
}

const mapStateToProps = state => {
    return {
        ingredients: state.burgerBuilder.ingredients,
    }
};

export default connect(mapStateToProps)(burger)