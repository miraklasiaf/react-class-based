import React, { Component } from 'react';
import { connect } from 'react-redux';
import Input from '../components/UI/Form/Input';
import Button from '../components/UI/Button/Button';
import * as action from '../store/actions'
import Spinner from '../components/UI/Spinner/Spinner'
import { Redirect } from '@reach/router'

class Auth extends Component {
    state = {
        controls: {
            email: {
                elementType: 'input',
                elementConfig: {
                    type: 'email',
                    placeholder: 'Mail Address'
                },
                value: '',
                validation: {
                    required: true,
                    isEmail: true
                },
                valid: false,
                clicked: false
            },
            password: {
                elementType: 'input',
                elementConfig: {
                    type: 'password',
                    placeholder: 'Password'
                },
                value: '',
                validation: {
                    required: true,
                    minLength: 6
                },
                valid: false,
                clicked: false
            }
        },
        isSignup: true
    }

    checkValidity (value, rules) {
        let isValid = true;
        if (!rules) {
            return true;
        }

        if (rules.required) {
            isValid = value.trim() !== '' && isValid;
        }

        if (rules.minLength) {
            isValid = value.length >= rules.minLength && isValid
        }

        if (rules.maxLength) {
            isValid = value.length <= rules.maxLength && isValid
        }

        if (rules.isEmail) {
            const pattern = /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/;
            isValid = pattern.test(value) && isValid
        }

        if (rules.isNumeric) {
            const pattern = /^\d+$/;
            isValid = pattern.test(value) && isValid
        }

        return isValid;
    }

    handleInput = (event, controlName) => {
        const updatedControls = {
            ...this.state.controls,
            [controlName]: {
                ...this.state.controls[controlName],
                value: event.target.value,
                valid: this.checkValidity(event.target.value, this.state.controls[controlName].validation),
                clicked: true
            }
        };
        this.setState({ controls: updatedControls });
    }

    handleSubmit = (event) => {
        event.preventDefault();
        this.props.auth(this.state.controls.email.value, this.state.controls.password.value, this.state.isSignup);
    }

    handleAuthMode = () => {
        this.setState(prevState => {
            return { isSignup: !prevState.isSignup };
        });
    }

    componentDidMount() {
        if(!this.props.building && this.props.authRedirect !== '/'){
            this.props.authRedirect()
        }
    }

    render () {
        const formElementsArray = [];
        for (let key in this.state.controls) {
            formElementsArray.push({
                id: key,
                config: this.state.controls[key]
            });
        }

        let form = formElementsArray.map(formElement => (
            <Input
                key={formElement.id}
                elementType={formElement.config.elementType}
                elementConfig={formElement.config.elementConfig}
                value={formElement.config.value}
                invalid={!formElement.config.valid}
                shouldValidate={formElement.config.validation}
                clicked={formElement.config.clicked}
                changed={(event) => this.handleInput(event, formElement.id)} />
        ));

        if(this.props.loading){
            form = <Spinner />
        }

        let errorMessage = null;

        if(this.props.error){
            errorMessage = (
                <p className="text-center text-lg text-gray-600">{this.props.error.message}</p>
            )
        }

        let redirect = null;
        if(this.props.isAuth){
            redirect = <Redirect to={this.props.authRedirectPath} noThrow />
        }

        return (
            <div className="flex px-4 py-5 text-center w-full justify-center">
                <div className="w-full flex flex-col border px-3 py-3 rounded-lg sm:w-2/3">
                    {redirect}
                    {errorMessage}
                    <form onSubmit={this.handleSubmit} className="text-gray-100">
                        {form}
                        <Button btnType="Success">SUBMIT</Button>
                    </form>
                    <Button
                        clicked={this.handleAuthMode}
                        btnType="Danger">Switch to {this.state.isSignup ? 'Sign In' : 'Sign Up'}
                    </Button>
                </div>
            </div>
        );
    }
}

const mapStateToProps = state => ({
    loading: state.auth.loading,
    error: state.auth.error,
    isAuth: state.auth.token !== null,
    building: state.burgerMaker.building,
    authRedirectPath: state.auth.authRedirectPath
})

const mapDispatchToProps = dispatch => ({
    auth: (email, password, isSignup) => dispatch(action.auth(email, password, isSignup)),
    authRedirect: () => dispatch(action.authRedirect("/"))
})

export default connect(mapStateToProps, mapDispatchToProps)(Auth);