import React, { Component } from 'react'
import { navigate } from '@reach/router'
import Auxiliary from '../hoc/Auxiliary'
import Burger from '../components/Burger/Burger'
import Builder from '../components/Burger/Builder/Builder'
import Modal from '../components/UI/Modal/Modal'
import OrderSummary from '../components/Burger/OrderSummary'
import Spinner from '../components/UI/Spinner/Spinner'
import error from '../hoc/Error'
import axios from '../axios-orders'
import { connect } from 'react-redux'
import * as action from '../store/actions'

class BurgerMaker extends Component {
    state = {
        isPurchasing: false
    }

    componentDidMount() {
        this.props.initIngredient();
    }

    handleContinue = () => {
        this.props.initPurchase();
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
        if(this.props.isAuth){
            this.setState({ isPurchasing: true })
        } else {
            this.props.authRedirect('/checkout')
            navigate("/auth")
        }
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
        let burger = this.props.error ? <p className="text-center">Ingredients can't be loaded</p> : <Spinner />


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
                  isAuth={this.props.isAuth}
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
    ingredients: state.burgerMaker.ingredients,
    price: state.burgerMaker.totalPrice,
    error: state.burgerMaker.error,
    isAuth: state.auth.token !== null
})

const mapDispatchToProps = dispatch => ({
    addIngredient: ingredientName => dispatch(action.addIngredient(ingredientName)),
    deleteIngredient: ingredientName => dispatch(action.deleteIngredient(ingredientName)),
    initIngredient: () => dispatch(action.initIngredient()),
    initPurchase: () => dispatch(action.initPurchase()),
    authRedirect: (path) => dispatch(action.authRedirect(path))
})

export default connect(mapStateToProps, mapDispatchToProps)(error(BurgerMaker, axios))