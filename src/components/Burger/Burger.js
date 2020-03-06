import React from 'react'
import Ingredient from './Ingredient/Ingredient'

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
        formatIngredients = <p className="text-base">Start add some ingredients!</p>
    }

    return (
        <div className="w-full flex flex-col items-center">
            <div className="w-1/3 h-64 overflow-scroll text-center font-bold text-lg">
                <Ingredient type="bread-top" />
                {formatIngredients}
                <Ingredient type="bread-bottom" />
            </div>
        </div>
    );
}

export default burger;