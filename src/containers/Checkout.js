import React, { Component } from 'react'
import CheckoutSummary from '../components/Order/CheckoutSummary'
import { connect } from 'react-redux'
import { Redirect } from '@reach/router'

class Checkout extends Component {
    handleCancel = () => {
        this.props.navigate("/", { replace: true })
    } 

    handleContinue = () => {
        this.props.navigate("/checkout/contact-data", { replace: true})   
    }

    render() {
        let summary = <Redirect to="/" />
        if(this.props.ingredients){
            console.log(this.props);
            const purchasedRedirect = this.props.purchased ? <Redirect to="/" /> : null
            summary = (
                <div>
                    {purchasedRedirect}
                    <CheckoutSummary
                        ingredients={this.props.ingredients}
                        cancel={this.handleCancel}
                        continue={this.handleContinue}
                    />
                    {this.props.children}
                </div>
            )
        }
        return summary
    }
}

const mapStateToProps = state => ({
    ingredients: state.burgerMaker.ingredients,
    purchased: state.order.purchased
})


export default connect(mapStateToProps)(Checkout)