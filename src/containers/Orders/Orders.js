import React, {Component} from 'react';
import { connect } from 'react-redux'
import axios from '../../axios-orders'

import Order from '../../components/Order/Order'
import Spinner from '../../components/UI/Spinner/Spinner'
import withError from '../../hoc/withAxiosErrorHandler/withAxiosErrorHandler'

import classes from './Orders.css'
import { fetchOrders } from "../../store/actions/order";

class Orders extends Component {
    componentDidMount() {
        this.props.fetchOrders(this.props.token, this.props.userId);
    }

    render() {
        let orders = <Spinner />;

        if (!this.props.loading) {
            orders = this.props.orders.map(order => {
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

const mapStateToProps = state => {
    return {
        orders: state.order.orders,
        loading: state.order.loading,
        token: state.auth.authToken,
        userId: state.auth.userId,
    }
};

const mapDispatchToProps = dispatch => {
    return {
        fetchOrders: (token, userId) => dispatch(fetchOrders(token, userId))
    }
};

export default connect(mapStateToProps, mapDispatchToProps)(withError(Orders, axios));