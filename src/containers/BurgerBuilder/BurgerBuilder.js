import React, { Component } from 'react'
import Auxiliary from '../../hoc/Auxiliary'
import Burger from '../../components/Burger/Burger'
import Builder from '../../components/Burger/Builder/Builder'

const INGREDIENT_PRICES = {
    salad: 1000,
    cheese: 1500,
    meat: 3000,
    bacon: 5000
}

export default class BurgerBuilder extends Component {
    state = {
        ingredients: {
            salad: 0,
            bacon: 0,
            cheese: 0,
            meat: 0
        },
        totalPrice: 5000
    }

    handleAddIngredient = (type) => {
        const oldCount = this.state.ingredients[type];
        const updatedCount = oldCount + 1;

        // Update ingredient
        const updatedIngredient = {
            ...this.state.ingredients
        }
        updatedIngredient[type] = updatedCount;

        // Update price
        const priceAddition = INGREDIENT_PRICES[type];
        const oldPrice = this.state.totalPrice;
        const newPrice = oldPrice + priceAddition;

        this.setState({
            totalPrice: newPrice,
            ingredients: updatedIngredient
        })
    }

    handleRemoveIngredient = (type) => {
        const oldCount = this.state.ingredients[type];
        if(oldCount <= 0){
            return
        }
        const updatedCount = oldCount - 1;
        const updatedIngredient = {
          ...this.state.ingredients
        };
        updatedIngredient[type] = updatedCount;

        const priceDeduction = INGREDIENT_PRICES[type];
        const oldPrice = this.state.totalPrice;
        const newPrice = oldPrice - priceDeduction;

        this.setState({
          totalPrice: newPrice,
          ingredients: updatedIngredient
        });
    }

    render() {
        const disabledInfo = {
            ...this.state.ingredients
        }

        for(let key in disabledInfo){
            disabledInfo[key] = disabledInfo[key] <= 0
        }

        return (
            <Auxiliary>
                <Burger ingredients={this.state.ingredients} />
                <Builder 
                    addIngredient={this.handleAddIngredient} 
                    removeIngredient={this.handleRemoveIngredient}
                    disabled={disabledInfo}
                    price={this.state.totalPrice}
                />
            </Auxiliary>
        );
    }
}