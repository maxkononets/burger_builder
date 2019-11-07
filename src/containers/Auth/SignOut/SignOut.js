import React, {Component} from 'react';
import {Redirect} from "react-router-dom";
import {connect} from "react-redux";
import {signOut} from "../../../store/actions/auth";

class SignOut extends Component {
    UNSAFE_componentWillMount() {
        this.props.signOut();
    }

    render() {
        return <Redirect to={'/signin'}/>;
    }
}

const mapDispatchToProps = dispatch => {
    return {
        signOut: () => dispatch(signOut())
    }
};

export default connect(null, mapDispatchToProps)(SignOut);