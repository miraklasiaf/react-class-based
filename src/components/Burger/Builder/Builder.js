import React from 'react'
import Control from './Control/Control'

const controls = [
  { label: "Salad", type: "salad" },
  { label: "Bacon", type: "bacon" },
  { label: "Cheese", type: "cheese" },
  { label: "Meat", type: "meat" }
];

const builder = (props) => (
    <div className="w-1/2 mx-auto bg-gray-600 items-center p-3 m-6 rounded-md shadow-lg">
        <p className="text-white mb-3 bold">Current Price: Rp. {props.price}</p>
        {controls.map(control => {
            return (
                <Control
                    key={control.label}
                    label={control.label}
                    added={() => props.addIngredient(control.type)} 
                    removed={() => props.removeIngredient(control.type)}
                    disabled={props.disabled[control.type]}
                />
            )
        })}
    </div>
)

export default builder;