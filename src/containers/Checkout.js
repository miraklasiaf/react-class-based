import React, { Component } from 'react'
import CheckoutSummary from '../components/Order/CheckoutSummary'

export default class Checkout extends Component {
    constructor(props) {
        super(props);
        this.state = {
            ingredients: {},
            price: 5000
        }
        console.log(this.props, 'Checkout')
    }

    componentDidMount() {
        const ingredients = this.props.location.state.ingredients ? this.props.location.state.ingredients : this.state.ingredients
        const price = this.props.location.state.price ? this.props.location.state.price : this.state.price

        this.setState({
            ingredients: ingredients,
            price: price
        });
    }

    handleCancel = () => {
        this.props.navigate("/", { replace: true })
    } 

    handleContinue = () => {
        this.props.navigate("/checkout/contact-data", { replace: true, state: {
            ingredients: this.state.ingredients,
            price: this.state.price
        }})   
    }

    render() {
        return (
            <>
                <CheckoutSummary
                    ingredients={this.state.ingredients}
                    cancel={this.handleCancel}
                    continue={this.handleContinue}
                />
                {this.props.children}
            </>
        )
    }
}
