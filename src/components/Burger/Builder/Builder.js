import React from 'react'
import Control from './Control/Control'
import styles from './Builder.module.css'

const controls = [
  { label: "Salad", type: "salad" },
  { label: "Bacon", type: "bacon" },
  { label: "Cheese", type: "cheese" },
  { label: "Meat", type: "meat" }
];

const builder = (props) => (
    <div className={styles.Builder}>
        <p className="text-white mb-3 bold">Current Price: Rp. {props.price}</p>
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
            className={styles.OrderButton}
            disabled={!props.isPurchase}
            onClick={props.ordered}
        >ORDER NOW</button>
    </div>
)

export default builder;