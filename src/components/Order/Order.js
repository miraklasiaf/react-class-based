import React, {Component} from 'react'
import Auxiliary from '../../hoc/Auxiliary'
import Button from '../UI/Button/Button'

export default class Order extends Component {
    // Can revert back to functional component
    componentDidUpdate() {
        console.log('Order Component')
    }

    render() {
        const ingredientSummary = Object.keys(this.props.ingredients)
            .map(igKey => {
                return (
                    <li key={igKey}>
                        <span className="capitalize">{igKey}</span>: {this.props.ingredients[igKey]}
                    </li>
                )
            })

        return (
            <Auxiliary>
                <h3 className="font-bold mb-2">Your Order</h3>
                <p className="mb-2">A delicious burger with the following ingredients</p>
                <ul>
                    {ingredientSummary}
                </ul>
                <p className="font-bold mt-2">Total Price: Rp {this.props.price} </p>
                <div className="text-center mt-5">
                    <p>Continue to Checkout?</p>
                    <Button clicked={this.props.cancel} btnType="Danger">CANCEL</Button>
                    <Button clicked={this.props.continue} btnType="Success">CONTINUE</Button>
                </div>
            </Auxiliary>
        )
    }
}
