import React from 'react';
import {connect} from "react-redux";

import Aux from '../../../../hoc/Auxiliary/auxiliary'
import NavigationItem from './NavigationItem/NavigationItem'
import classes from './NavigationItems.css'

export const navigationItems = props => {
    let navItems = (<Aux>
        <NavigationItem
            link="/"
            exact
        >
            Burger builder
        </NavigationItem>
        <NavigationItem
            link="/orders"
        >
            Orders
        </NavigationItem>
        <NavigationItem
            link="/signout"
        >
            Sign Out
        </NavigationItem>
    </Aux>);

    if (!props.isAuth) {
        navItems = (<Aux>
            <NavigationItem
                link="/"
                exact
            >
                Burger builder
            </NavigationItem>
            <NavigationItem
                link="/signin"
            >
                Sign In
            </NavigationItem>
            <NavigationItem
                link="/signup"
            >
                Sign Up
            </NavigationItem>
        </Aux>)
    }

    return (
        <ul className={classes.NavigationItems}>
            {navItems}
        </ul>
    );
};

const mapStateToProps = state => {
    return {
        isAuth: state.auth.authToken !== null,
    }
};

export default connect(mapStateToProps)(navigationItems);
