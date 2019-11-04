import React, {Component} from 'react';

import axios from '../../axios-orders'

import Order from '../../components/Order/Order'
import Spinner from '../../components/UI/Spinner/Spinner'

import classes from './Orders.css'

class Orders extends Component {
    state = {
        orders: [],
        loading: false
    };

    componentDidMount() {
        this.setState({loading: true});
        axios.get('orders.json')
            .then(response => {
                let transformedOrders = [];
                for (let orderId in response.data) {
                    transformedOrders.push({
                        id: orderId,
                        ...response.data[orderId],
                    })
                }
                this.setState({
                    orders: transformedOrders,
                    loading:false,
                })
            })
            .catch(error => {
                this.setState({
                    loading:false,
                })
            })
    }

    render() {
        let orders = <Spinner />;

        if (!this.state.loading) {
            orders = this.state.orders.map(order => {
                return (<Order
                    key={order.id}
                    ingredients={order.ingredients}
                    price={Number.parseFloat(order.price)}
                />)
            })
        }

        return (
            <div className={classes.Orders}>
                {orders}
            </div>
        );
    }
}

export default Orders;