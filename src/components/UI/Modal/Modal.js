import React from 'react'
import classes from './Modal.css'

import Auxiliary from "../../../hoc/Auxiliary/auxiliary";
import Backdrop from '../Backdrop/Backdrop'

const modal = props => {
    return (
        <Auxiliary>
            <div
                style={{
                    transform: props.show ? 'translateY(0)' : 'translateY(-100vh)',
                    opacity: props.show ? '1' : '0'
                }}
                className={classes.Modal}
            >
                {props.children}
            </div>
            <Backdrop show={props.show} clicked={props.modalClosed}/>
        </Auxiliary>
    )
}

export default modal