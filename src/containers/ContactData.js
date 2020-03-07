import React, { Component } from 'react'
import Button from '../components/UI/Button/Button'
import axios from '../axios-orders'
import Spinner from '../components/UI/Spinner/Spinner'
import Input from '../components/UI/Form/Input'
import { connect } from 'react-redux'

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
        loading: false,
        formIsValid: false
    }

    handleOrder = (event) => {
        event.preventDefault();
        this.setState({ loading: true })

        const formData = {};
        for(let keyIdentifier in this.state.orderForm){
            formData[keyIdentifier] = this.state.orderForm[keyIdentifier].value
        }

        const order = {
            ingredients: this.props.ingredients,
            price: this.props.price,
            orderData: formData
        }
        axios.post('orders.json', order)
            .then(res => {
                this.setState({ loading: false })
                this.props.navigate("/")
            })
            .catch(err => {
                this.setState({ loading: false })
            })
    }

    handleInputChange = (event, inputIdentifier) => {
        const newForm = { ...this.state.orderForm }
        const newFormElement = { ...newForm[inputIdentifier] }

        newFormElement.value = event.target.value;
        newFormElement.valid = this.handleValidation(newFormElement.value, newFormElement.validation)
        newFormElement.clicked = true
        newForm[inputIdentifier] = newFormElement;

        let formIsValid = true;

        for (let inputIdentifier in newForm){
            formIsValid = newForm[inputIdentifier].valid && formIsValid
        }

        this.setState({ orderForm: newForm, formIsValid: formIsValid })
    }

    handleValidation = (value, rules) => {
        let isValid = true;

        if(!rules){
            return true;
        }

        if(rules.required){
            isValid = value.trim() !== '' && isValid
        }

        if(rules.minLength){
            isValid = value.length >= rules.minLength && isValid
        }

        if(rules.maxLength){
            isValid = value.length <= rules.maxLength && isValid
        }

        return isValid
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
        if(this.state.loading){
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
  ingredients: state.ingredients,
  price: state.totalPrice
});

export default connect(mapStateToProps)(ContactData);
