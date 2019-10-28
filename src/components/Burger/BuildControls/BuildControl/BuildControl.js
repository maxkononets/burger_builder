import React from 'react'
import classes from './BuildControl.css'
import PropTypes from 'prop-types'

const buildControl = props => {
    return (
        <div className={classes.BuildControl}>
            <div>{props.label}</div>
            <button
                onClick={props.removed}
                className={classes.Less}
                disabled={props.disabled}
            >
                Less
            </button>
            <button
                onClick={props.added}
                className={classes.More}
            >
                More
            </button>
        </div>
    )
}

buildControl.prototype = {
    added: PropTypes.function
}

export default buildControl