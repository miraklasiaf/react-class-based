import React from 'react'

export default function Order(props) {
    const ingredients = []

    for (let ingredientName in props.ingredients){
        ingredients.push({
            name: ingredientName,
            amount: props.ingredients[ingredientName]
        });
    }

    const ingredientOutput = ingredients.map(ig => {
        return (
            <span key={ig.name} className="capitalize inline-block mx-1 border-b">{ig.name}({ig.amount})</span>
        )
    })

    return (
        <div className="w-1/2 p-8 text-gray-700 flex flex-col items-center mt-5 hover:bg-gray-400 border-b">
            <p>Ingredients: {ingredientOutput} </p>
            <p>Price: <strong>Rp. {props.price}</strong></p>
        </div>
    )
}
