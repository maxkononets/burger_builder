import React, {Component} from 'react';
import {connect} from "react-redux";

import Input from "../../../components/UI/Input/Input";
import Button from "../../../components/UI/Button/Button";
import Spinner from "../../../components/UI/Spinner/Spinner";

import classes from "../Auth.css";
import * as authActions from "../../../store/actions/auth";

class SignIn extends Component {
    state = {
        formIsValid: true,
        form: {
            email: {
                elementType: 'input',
                elementConfig: {
                    type: 'email',
                    placeholder: 'Email'
                },
                value: `0.39980590928852267@gmail.com`,
                validation: {
                    required: true,
                    isEmail: true,
                },
                valid: true,
                touched: false
            },
            password: {
                elementType: 'input',
                elementConfig: {
                    type: 'password',
                    placeholder: 'Password'
                },
                value: 'secret',
                validation: {
                    required: true,
                    minLength: 6,
                },
                valid: true,
                touched: true
            },
        }
    };

    checkValidity(value, rules) {
        let isValid = true;
        if (!rules) {
            return true;
        }

        if (rules.required) {
            isValid = value.trim() !== '' && isValid;
        }

        if (rules.minLength) {
            isValid = value.length >= rules.minLength && isValid
        }

        if (rules.maxLength) {
            isValid = value.length <= rules.maxLength && isValid
        }

        if (rules.isEmail) {
            const pattern = /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/;
            isValid = pattern.test(value) && isValid
        }

        if (rules.isNumeric) {
            const pattern = /^\d+$/;
            isValid = pattern.test(value) && isValid
        }

        return isValid;
    };

    inputChangedHandler = (event, inputIdentifier) => {
        const updatedOrderForm = {
            ...this.state.form
        };
        const updatedFormElement = {
            ...updatedOrderForm[inputIdentifier]
        };
        updatedFormElement.value = event.target.value;
        updatedFormElement.valid = this.checkValidity(updatedFormElement.value, updatedFormElement.validation);
        updatedFormElement.touched = true;
        updatedOrderForm[inputIdentifier] = updatedFormElement;

        let formIsValid = true;
        for (let inputIdentifier in updatedOrderForm) {
            formIsValid = updatedOrderForm[inputIdentifier].valid && formIsValid;
        }
        this.setState({form: updatedOrderForm, formIsValid: formIsValid});
    };

    submitHandler = (event) => {
        event.preventDefault();
        this.props.signIn(
            this.state.form.email.value,
            this.state.form.password.value
        )
    };

    render() {
        const formElementsArray = [];
        for (let key in this.state.form) {
            formElementsArray.push({
                id: key,
                config: this.state.form[key]
            });
        }
        let form = (
            <div>
                <form onSubmit={this.submitHandler}>
                    {formElementsArray.map(formElement => (
                        <Input
                            key={formElement.id}
                            elementType={formElement.config.elementType}
                            elementConfig={formElement.config.elementConfig}
                            value={formElement.config.value}
                            invalid={!formElement.config.valid}
                            shouldValidate={formElement.config.validation}
                            touched={formElement.config.touched}
                            changed={(event) => this.inputChangedHandler(event, formElement.id)}/>
                    ))}
                    <p>{this.props.error}</p>
                    <Button type="Success" disabled={!this.state.formIsValid}>SIGN IN</Button>
                </form>
            </div>
        );
        if (this.props.loading) {
            form = <Spinner/>;
        }

        return (
            <div className={classes.AuthForm}>
                {form}
            </div>
        );
    }
}


const mapStateToProps = state => {
    return {
        loading: state.auth.loading,
        error: state.auth.error,
    }
};

const mapDispatchToProps = dispatch => {
    return {
        signIn: (email, password) => dispatch(authActions.signIn(email, password)),
    }
};

export default connect(mapStateToProps, mapDispatchToProps)(SignIn);