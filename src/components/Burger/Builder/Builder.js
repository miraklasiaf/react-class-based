import React from 'react'
import Control from './Control/Control'

const controls = [
  { label: "Salad", type: "salad" },
  { label: "Bacon", type: "bacon" },
  { label: "Cheese", type: "cheese" },
  { label: "Meat", type: "meat" }
];

const builder = (props) => (
    <div className="w-1/3 mx-auto bg-white items-center p-3 m-6 mt-8 rounded-md shadow-lg text-center">
        <p className="text-black mb-3 bold">Current Price: Rp. {props.price}</p>
        {controls.map(control => (
            <Control
                key={control.label}
                label={control.label}
                added={() => props.addIngredient(control.type)} 
                removed={() => props.removeIngredient(control.type)}
                disabled={props.disabled[control.type]}
            />
        ))}
        <button 
            className="w-64 mr-3 mb-3 bg-orange-700 p-3 outline-none rounded-lg hover:bg-blue-600 text-white"
            disabled={!props.isPurchase}
            onClick={props.ordered}
        >ORDER NOW</button>
    </div>
)

export default builder;