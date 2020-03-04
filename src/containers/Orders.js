import React, { Component } from 'react'
import Order from '../components/Order/Order'
import axios from '../axios-orders'
import Error from '../hoc/Error'

class Orders extends Component {
    state = {
        orders: [],
        loading: true
    }

    componentDidMount() {
        axios.get('/orders.json')
            .then(res => {
                const fetchOrders = [];
                for(let key in res.data){
                    fetchOrders.push({
                        id: key,
                        ...res.data[key]
                    });
                }
                this.setState({
                    loading: false,
                    orders: fetchOrders
                })
            })
            .catch(err => {
                this.setState({
                    loading: false
                })
            })
    }

    render() {
        return (
            <div className="flex flex-col items-center w-full">
                {this.state.orders.map(order => (
                    <Order
                        key={order.id}
                        ingredients={order.ingredients}
                        price={order.price}
                    />
                ))}
            </div>
        )
    }
}

export default Error(Orders, axios)