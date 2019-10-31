import React from 'react';
import NavigationItem from './NavigationItem/NavigationItem'
import classes from './NavigationItems.css'

const navigationItems = () => (
    <ul className={classes.NavigationItems}>
        <NavigationItem
            link="/"
            exact
        >
            Burger builder
        </NavigationItem>
        <NavigationItem
            link="/checkout"
        >
            Checkout
        </NavigationItem>
    </ul>
);

export default navigationItems;