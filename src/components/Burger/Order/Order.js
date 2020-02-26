import React from 'react'
import Auxiliary from '../../../hoc/Auxiliary'
import Button from '../../UI/Button/Button'

export default function Order(props) {
    const ingredientSummary = Object.keys(props.ingredients)
        .map(igKey => {
            return (
                <li key={igKey}>
                    <span className="capitalize">{igKey}</span>: {props.ingredients[igKey]}
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
            <p className="font-bold mt-2">Total Price: Rp {props.price} </p>
            <div className="text-center mt-5">
                <p>Continue to Checkout?</p>
                <Button clicked={props.cancel} btnType="Danger">CANCEL</Button>
                <Button clicked={props.continue} btnType="Success">CONTINUE</Button>
            </div>
        </Auxiliary>
    )
}
