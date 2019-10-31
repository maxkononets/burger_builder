import React, {Component} from 'react';
import {withRouter} from 'react-router-dom'

import Button from '../../UI/Button/Button'
import Spinner from '../../UI/Spinner/Spinner'

import classes from './ContactData.css'
import axios from "../../../axios-orders";

class ContactData extends Component {
    state = {
        customer: {
            name: '',
            email: '',
            address: {
                zipCode: '',
                street: '',
            },
        },
        deliveryMethod: '',
        loading: false,
    };

    handleFormSubmit = (event) => {
        event.preventDefault();

        this.setState({loading: true});

        const orderObject = {
            ingredients: this.props.ingredients,
            price: this.props.price,
            customer: {...this.state.customer},
            deliveryMethod: this.state.deliveryMethod
        };
        axios.post(
            'orders.json',
            orderObject
        ).then(response => {
            this.setState({
                loading: false,
            })
            this.props.history.push('/')
        }).catch(response => {
            this.setState({
                loading: false,
            })
        })
    };

    render() {
        let form = <Spinner />;
        if (!this.state.loading) {
            form = <form onSubmit={this.handleFormSubmit}>
                <input
                    value={this.state.customer.name}
                    onChange={(e) => this.setState({
                        customer: {
                            ...this.state.customer,
                            name: e.target.value
                        }
                    })}
                    type="text"
                    name="name"
                    placeholder="Name"
                />
                <input
                    value={this.state.customer.email}
                    onChange={(e) => this.setState({
                        customer: {
                            ...this.state.customer,
                            email: e.target.value,
                        }
                    })}
                    type="text"
                    name="email"
                    placeholder="Email"
                />
                <input
                    value={this.state.customer.address.zipCode}
                    onChange={(e) => this.setState({
                        customer: {
                            ...this.state.customer,
                            address: {
                                ...this.state.customer.address,
                                zipCode: e.target.value
                            }
                        }
                    })}
                    type="text"
                    name="zipCode"
                    placeholder="Zip Code"
                />
                <input
                    value={this.state.customer.address.street}
                    onChange={(e) => this.setState({
                        customer: {
                            ...this.state.customer,
                            address: {
                                ...this.state.customer.address,
                                street: e.target.value
                            }
                        }
                    })}
                    type="text"
                    name="street"
                    placeholder="Street"
                />
                <select
                    value={this.state.deliveryMethod}
                    onChange={(e) => this.setState({deliveryMethod: e.target.value})}
                    name="deliveryMethod"
                    placeholder="Delivery Method"
                >
                    <option disabled defaultChecked value="">Choose delivery method</option>
                    <option value="novaPoshta">Nova Poshta</option>
                    <option value="ukrPoshta">Ukr Poshta</option>
                </select>
                <Button type="Success">ORDER</Button>
            </form>
        }

        return (
            <div className={classes.ContactData}>
                <h4>Enter your contact data:</h4>
                {form}
            </div>
        );
    }
}

export default withRouter(ContactData);