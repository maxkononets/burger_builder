import React from 'react';
import Burger from "./../../Burger/Burger";
import Button from '../../UI/Button/Button';

const checkoutSummary = props => {
    return (
        <div>
            <h1>We hope it tastes well!</h1>
            <Burger
                ingredients={props.ingredients}
            />
            <Button
                type={'Danger'}
                clicked={props.cancelClicked}
            >CANCEL</Button>
            <Button
                type={'Success'}
                clicked={props.continueClicked}
            >CONTINUE</Button>
        </div>
    );
};

export default checkoutSummary;