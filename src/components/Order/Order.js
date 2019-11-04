import React from 'react';
import classes from './Order.css'

const order = props => {
    let ingredients = [];
    for (const ing in props.ingredients) {
        ingredients.push({
            name: ing,
            count: props.ingredients[ing]
        })
    }

    ingredients = ingredients.map((ing, index) => {
        return <span
            key={index}
            style={{
                margin: '0 10px',
                display: 'inline-block'
            }}
        >
            <span
                style={{
                    border: "1px solid #333333",
                    borderRadius: '8px',
                    padding: '5px',
                    textTranslate: 'capitalize',
                    marginRight: '3px',
                }}
            >
                {ing.name}
            </span>
            <strong>
                x {ing.count}
            </strong>
        </span>
    });

    return (
        <div className={classes.Order}>
            <p>Ingredients: {ingredients}</p>
            <p>Price: <strong>USD {props.price.toFixed(2)}</strong></p>
        </div>
    );
};

export default order;