import React from 'react'
import classes from './Button.css'
import PropTypes from 'prop-types'

const button = (props) => (
    <button
        onClick={props.clicked}
        disabled={props.disabled}
        className={[classes.Button, classes[props.type]].join(' ')}
    >
        {props.children}
    </button>
)

button.proptype = {
    buttonType: PropTypes.oneOf(['Success', 'Danger'])
}

export default button