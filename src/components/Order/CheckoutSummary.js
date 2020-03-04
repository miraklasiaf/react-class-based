import React from 'react'
import Burger from '../Burger/Burger'
import Button from '../UI/Button/Button'

export default function CheckoutSummary(props) {
    return (
        <div className="flex flex-col items-center w-full mt-8">
            <h1 className="text-gray-700 text-xl">We hope it tastes well!</h1>
            <div className="w-64 h-64 bg-red-700 mt-8">
                <Burger ingredients={props.ingredients} />
            </div>
            <div className="flex">
                <Button btnType="Danger" clicked={props.cancel}>CANCEL</Button>
                <Button btnType="Success" clicked={props.continue}>CONTINUE</Button>
            </div>
        </div>
    )
}
