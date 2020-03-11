import React, { Component } from 'react'
import Order from '../components/Order/Order'
import axios from '../axios-orders'
import Error from '../hoc/Error'
import * as action from '../store/actions'
import { connect } from 'react-redux'
import Spinner from '../components/UI/Spinner/Spinner'

class Orders extends Component {
    componentDidMount() {
        this.props.fetchOrders(this.props.token, this.props.userId);
    }

    render() {
        let orders = <Spinner />;
        if(!this.props.loading){
            orders = (
                <div className="flex flex-col items-center w-full">
                    {this.props.orders.map(order => (
                        <Order
                            key={order.id}
                            ingredients={order.ingredients}
                            price={order.price}
                        />
                    ))}
                </div>
            )
        }
        return orders
    }
}

const mapStateToProps = state => ({
    orders: state.order.orders,
    loading: state.order.loading,
    token: state.auth.token,
    userId: state.auth.userId
})

const mapDispatchToProps = dispatch => ({
    fetchOrders: (token, userId) => dispatch(action.fetchOrders(token, userId))
})

export default connect(mapStateToProps, mapDispatchToProps)(Error(Orders, axios))