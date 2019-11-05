import React, {Component} from 'react';
import { connect } from 'react-redux'

import Order from '../../components/Order/Order'
import Spinner from '../../components/UI/Spinner/Spinner'

import classes from './Orders.css'
import { fetchOrders } from "../../store/actions/order";

class Orders extends Component {
    componentDidMount() {
        this.props.fetchOrders();
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
    }
};

const mapDispatchToProps = dispatch => {
    return {
        fetchOrders: () => dispatch(fetchOrders())
    }
};

export default connect(mapStateToProps, mapDispatchToProps)(Orders);