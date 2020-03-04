import React, { Component } from 'react'
import Button from '../components/UI/Button/Button'
import axios from '../axios-orders'
import Spinner from '../components/UI/Spinner/Spinner'

export default class ContactData extends Component {
    constructor(props) {
        super(props)
        this.state = {
            name: '',
            email: '',
            address: {
                street: '',
                postalCode: ''
            },
            loading: false
        }
        console.log(this.props, 'Contact Data')
    }

    handleOrder = (event) => {
        event.preventDefault();
        this.setState({
            loading: true
        })

        const order = {
            ingredients: this.props.location.state.ingredients,
            price: this.props.location.state.price,
            customer: {
                name: 'Faisal Karim',
                address: {
                    street: 'Jalan',
                    zipCode: '29428',
                    country: 'Germany'
                },
                email: 'faisalkarim96@gmail.com'
            },
            deliveryMethod: 'Fastest'
        }
        axios.post('orders.json', order)
            .then(res => {
                console.log(res)
                this.setState({
                    loading: false
                })
                this.props.navigate("/")
            })
            .catch(err => {
                this.setState({
                    loading: false
                })
            })
    }

    render() {
        let form = (
            <form className="max-w-xl w-full text-gray-700 p-4">
                <div className="flex flex-col">
                    <input className="bg-gray-700 mt-4 border border-gray-600 rounded-lg py-2 px-4 w-full" type="text" name="name" placeholder="Your Name" />
                </div>
                <div className="flex flex-col">
                    <input className="bg-gray-700 mt-4 border border-gray-600 rounded-lg py-2 px-4 w-full" type="text" name="email" placeholder="Your Email" />
                </div>
                <div className="flex flex-col">
                    <input className="bg-gray-700 mt-4 border border-gray-600 rounded-lg py-2 px-4 w-full" type="text" name="street" placeholder="Street" />
                    <input className="bg-gray-700 mt-4 border border-gray-600 rounded-lg py-2 px-4 w-full" type="text" name="postalCode" placeholder="Postal Code" />
                </div>
                <div className="flex flex-col">
                    <Button btnType="Success" clicked={this.handleOrder}>ORDER</Button>
                </div>
            </form>
        );
        if(this.state.loading){
            form = <Spinner />
        }
        return (
            <div className="flex flex-col items-center">
                <h4 className="mt-4 text-gray-700">Enter your Contact Data</h4>
                {form}
            </div>
        )
    }
}
