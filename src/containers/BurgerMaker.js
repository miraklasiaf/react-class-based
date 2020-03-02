import React, { Component } from 'react'
import Auxiliary from '../hoc/Auxiliary'
import Burger from '../components/Burger/Burger'
import Builder from '../components/Burger/Builder/Builder'
import Modal from '../components/UI/Modal/Modal'
import Order from '../components/Order/Order'
import axios from '../axios-orders'
import Spinner from '../components/UI/Spinner/Spinner'
import error from '../hoc/Error'

const INGREDIENT_PRICES = {
    salad: 1000,
    cheese: 1500,
    meat: 3000,
    bacon: 5000
}

class BurgerMaker extends Component {
    state = {
        ingredients: null,
        totalPrice: 5000,
        isPurchase: false,
        isPurchasing: false,
        loading: false,
        error: false
    }

    componentDidMount() {
        axios.get("https://burger-junkie.firebaseio.com/ingredients.json")
            .then(res => {
                this.setState({
                    ingredients: res.data
                })
            })
            .catch(err => {
                this.setState({
                    error: true
                })
            })
    }

    handleContinue = () => {
        // alert('Selamat makan')
        this.setState({
            loading: true
        })

        const order = {
            ingredients: this.state.ingredients,
            price: this.state.totalPrice,
            customer: {
                name: 'Faisal Karim',
                address: {
                    street: 'Jalan',
                    zipCode: '29428',
                    country: 'Germany'
                },
                email: 'faisalkarim96@gmail.com'
            },
            deliveryMethod: 'Fastest'
        }
        axios.post('orders.json', order)
            .then(res => {
                this.setState({
                    loading: false,
                    isPurchasing: false
                })
            })
            .catch(err => {
                this.setState({
                    loading: false,
                    isPurchasing: false
                })
            })
    }

    handleCancel = () => {
        this.setState({
            isPurchasing: false
        })
    }

    handlePurchasing = () => {
        this.setState({
            isPurchasing: true
        })
    }

    handlePurchase = (ingredients) => {
        const sum = Object.keys(ingredients)
            .map(igKey => {
                return ingredients[igKey]
            })
            .reduce((sum, el) => sum + el, 0);

        this.setState({
            isPurchase: sum > 0
        })
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
        this.handlePurchase(updatedIngredient);
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
        this.handlePurchase(updatedIngredient);
    }

    render() {
        const disabledInfo = {
            ...this.state.ingredients
        }

        for(let key in disabledInfo){
            disabledInfo[key] = disabledInfo[key] <= 0
        }

        let order = null;
        let burger = this.state.error ? <p className="text-center">Ingredients cant be loaded</p> : <Spinner />


        if(this.state.ingredients){
            burger = (
              <Auxiliary>
                <Burger ingredients={this.state.ingredients} />
                <Builder
                  addIngredient={this.handleAddIngredient}
                  removeIngredient={this.handleRemoveIngredient}
                  disabled={disabledInfo}
                  price={this.state.totalPrice}
                  isPurchase={this.state.isPurchase}
                  ordered={this.handlePurchasing}
                />
              </Auxiliary>
            );
            order = (
                <Order
                    ingredients={this.state.ingredients}
                    price={this.state.totalPrice}
                    cancel={this.handleCancel}
                    continue={this.handleContinue}
                />
            );
        }
        if(this.state.loading){
            order = <Spinner />
        }

        return (
            <Auxiliary>
                <Modal isShow={this.state.isPurchasing} isClose={this.handleCancel}>
                    {order}
                </Modal>
                {burger}
            </Auxiliary>
        );
    }
}

export default error(BurgerMaker, axios)