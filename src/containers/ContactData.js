import React, { Component } from 'react'
import Button from '../components/UI/Button/Button'
import axios from '../axios-orders'
import Spinner from '../components/UI/Spinner/Spinner'
import Input from '../components/UI/Form/Input'
import { connect } from 'react-redux'
import Error from '../hoc/Error'
import * as orderAction from '../store/actions'
import { updateObject, checkValidity } from '../shared/utility'

class ContactData extends Component {
    state = {
        orderForm: {
            name: {
                elementType: 'input',
                elementConfig: {
                    type: 'text',
                    placeholder: 'Your Name'
                },
                value: '',
                validation: {
                    required: true
                },
                valid: false,
                clicked: false
            },
            street: {
                elementType: 'input',
                elementConfig: {
                    type: 'text',
                    placeholder: 'Street'
                },
                value: '',
                validation: {
                    required: true
                },
                valid: false,
                clicked: false
            },
            zipCode: {
                elementType: 'input',
                elementConfig: {
                    type: 'text',
                    placeholder: 'ZIP Code'
                },
                value: '',
                validation: {
                    required: true,
                    minLength: 5,
                    maxLength: 5
                },
                valid: false,
                clicked: false
            },
            country: {
                elementType: 'input',
                elementConfig: {
                    type: 'text',
                    placeholder: 'Country'
                },
                value: '',
                validation: {
                    required: true
                },
                valid: false,
                clicked: false
            },
            email: {
                elementType: 'input',
                elementConfig: {
                    type: 'email',
                    placeholder: 'Email'
                },
                value: '',
                validation: {
                    required: true
                },
                valid: false,
                clicked: false
            },
            deliveryMethod: {
                elementType: 'select',
                elementConfig: {
                    options: [
                        {value: 'fastest', displayValue: 'Fastest'},
                        {value: 'cheapest', displayValue: 'Cheapest'}
                    ]
                },
                value: 'fastest',
                validation: {},
                valid: true,
            },
        },
        name: '',
        email: '',
        address: {
            street: '',
            postalCode: ''
        },
        formIsValid: false
    }

    handleOrder = (event) => {
        event.preventDefault();

        const formData = {};
        for(let keyIdentifier in this.state.orderForm){
            formData[keyIdentifier] = this.state.orderForm[keyIdentifier].value
        }

        const order = {
            ingredients: this.props.ingredients,
            price: this.props.price,
            orderData: formData,
            userId: this.props.userId
        }

        this.props.orderBurger(order, this.props.token);
    }

    handleInputChange = (event, inputIdentifier) => {
        // const newForm = { ...this.state.orderForm }
        // const newFormElement = { ...newForm[inputIdentifier] }

        // newFormElement.value = event.target.value;
        // newFormElement.valid = this.handleValidation(newFormElement.value, newFormElement.validation)
        // newFormElement.clicked = true
        // newForm[inputIdentifier] = newFormElement;
        const newFormElement = updateObject(this.state.orderForm[inputIdentifier], {
            value: event.target.value,
            valid: checkValidity(event.target.value, this.state.orderForm[inputIdentifier].validation),
            clicked: true
        })

        const newForm = updateObject(this.state.orderForm, {
            [inputIdentifier]: newFormElement
        })

        let formIsValid = true;
        for (let inputIdentifier in newForm){
            formIsValid = newForm[inputIdentifier].valid && formIsValid
        }

        this.setState({ orderForm: newForm, formIsValid: formIsValid })
    }

    render() {
        const formElementArray = []
        for (let key in this.state.orderForm){
            formElementArray.push({
                id: key,
                config: this.state.orderForm[key]
            })
        }
        let form = (
            <form onSubmit={this.handleOrder} className="max-w-xl w-full text-gray-100 p-4">
                {formElementArray.map(formElement => (
                    <Input 
                        elementType={formElement.config.elementType}
                        elementConfig={formElement.config.elementConfig}
                        value={formElement.config.value}
                        key={formElement.id}
                        shouldValidate={formElement.config.validation}
                        invalid={!formElement.config.valid}
                        clicked={formElement.config.clicked}
                        changed={(event) => this.handleInputChange(event, formElement.id)}
                    />
                ))}
                <div className="flex flex-col">
                    <Button
                        btnType="Success"
                        clicked={this.handleOrder}
                        disabled={!this.state.formIsValid}
                    >ORDER</Button>
                </div>
            </form>
        );
        if(this.props.loading){
            form = <Spinner />
        }
        return (
            <div className="flex flex-col items-center">
                <h4 className="mt-4 text-gray-700">Enter your Contact Data</h4>
                {form}
            </div>
        )
    }
}

const mapStateToProps = state => ({
  ingredients: state.burgerMaker.ingredients,
  price: state.burgerMaker.totalPrice,
  loading: state.order.loading,
  token: state.auth.token,
  userId: state.auth.userId
});

const mapDispatchToProps = dispatch => ({
    orderBurger: (orderData, token) => dispatch(orderAction.purchase(orderData, token))
})

export default connect(mapStateToProps, mapDispatchToProps)(Error(ContactData, axios));
