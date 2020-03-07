import React, { Component } from 'react'
import CheckoutSummary from '../components/Order/CheckoutSummary'
import { connect } from 'react-redux'

class Checkout extends Component {
    handleCancel = () => {
        this.props.navigate("/", { replace: true })
    } 

    handleContinue = () => {
        this.props.navigate("/checkout/contact-data", { replace: true})   
    }

    render() {
        return (
            <>
                <CheckoutSummary
                    ingredients={this.props.ingredients}
                    cancel={this.handleCancel}
                    continue={this.handleContinue}
                />
                {this.props.children}
            </>
        )
    }
}

const mapStateToProps = state => ({
    ingredients: state.ingredients
})

export default connect(mapStateToProps)(Checkout)