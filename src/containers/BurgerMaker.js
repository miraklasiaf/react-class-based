import React, { Component } from 'react'
import { navigate } from '@reach/router'
import Auxiliary from '../hoc/Auxiliary'
import Burger from '../components/Burger/Burger'
import Builder from '../components/Burger/Builder/Builder'
import Modal from '../components/UI/Modal/Modal'
import OrderSummary from '../components/Burger/OrderSummary'
import axios from '../axios-orders'
import Spinner from '../components/UI/Spinner/Spinner'
import error from '../hoc/Error'
import { connect } from 'react-redux'
import * as types from '../store/actions'

class BurgerMaker extends Component {
   state = {
        isPurchasing: false,
        loading: false,
        error: false
    }

    componentDidMount() {
        // axios.get("https://burger-junkie.firebaseio.com/ingredients.json")
        //     .then(res => {
        //         this.setState({
        //             ingredients: res.data
        //         })
        //     })
        //     .catch(err => {
        //         this.setState({
        //             error: true
        //         })
        //     })
    }

    handleContinue = () => {
        navigate("/checkout", { 
            state: {
                ingredients: this.props.ingredients,
                price: this.state.totalPrice
            } 
        })
    }

    handleCancel = () => {
        this.setState({ isPurchasing: false })
    }

    handlePurchasing = () => {
        this.setState({ isPurchasing: true })
    }

    handlePurchase = (ingredients) => {
        const sum = Object.keys(ingredients)
            .map(igKey => { return ingredients[igKey] })
            .reduce((sum, el) => sum + el, 0);

        return sum > 0
    }

    render() {
        const disabledInfo = { ...this.props.ingredients }

        for(let key in disabledInfo){
            disabledInfo[key] = disabledInfo[key] <= 0
        }

        let order = null;
        let burger = this.state.error ? <p className="text-center">Ingredients cant be loaded</p> : <Spinner />


        if(this.props.ingredients){
            burger = (
              <Auxiliary>
                <Burger ingredients={this.props.ingredients} />
                <Builder
                  addIngredient={this.props.addIngredient}
                  removeIngredient={this.props.deleteIngredient}
                  disabled={disabledInfo}
                  price={this.props.price}
                  isPurchase={this.handlePurchase(this.props.ingredients)}
                  ordered={this.handlePurchasing}
                />
              </Auxiliary>
            );
            order = (
                <OrderSummary
                    ingredients={this.props.ingredients}
                    price={this.props.price}
                    cancel={this.handleCancel}
                    continue={this.handleContinue}
                />
            );
        }
        if(this.state.loading) {
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

const mapStateToProps = state => ({
    ingredients: state.ingredients,
    price: state.totalPrice
})

const mapDispatchToProps = dispatch => ({
    addIngredient: ingredientName => dispatch({type: types.ADD_INGREDIENT, ingredientName: ingredientName}),
    deleteIngredient: ingredientName => dispatch({type: types.DELETE_INGREDIENT, ingredientName: ingredientName}),
})

export default connect(mapStateToProps, mapDispatchToProps)(error(BurgerMaker, axios))