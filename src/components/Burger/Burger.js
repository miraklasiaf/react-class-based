import React from 'react'
import Ingredient from './Ingredient/Ingredient'
import './Burger.css'

const burger = (props) => {
    // Transform ingredient object to array
    let formatIngredients = Object.keys(props.ingredients)
        .map(igKey => {
            return [...Array(props.ingredients[igKey])].map((_, i) => {
                return <Ingredient key={igKey + i} type={igKey} />
            }) // [x,y]
        })
        .reduce((arr, el) => {
            return arr.concat(el)
        }, [])

    if(formatIngredients.length === 0){
        formatIngredients = <p>Start adding ingredients!</p>
    }
    console.log(formatIngredients)

    return (
      <div className="Burger">
        <Ingredient type="bread-top" />
        {formatIngredients}
        <Ingredient type="bread-bottom" />
      </div>
    );
}

export default burger;
