import React, { Component } from 'react'
import Input from '../../components/UI/Input/Input'
import Button from '../../components/UI/Button/Button'
import styles from './Auth.module.css'
import * as actions from '../../store/actions/index'
import {connect} from 'react-redux'
import Spinner from '../../components/UI/Spinner/Spinner'
import {Redirect} from 'react-router-dom'

class Auth extends Component {
    state = {
        controls: {
            email: {
                elementType: 'input',
                elementConfig: {
                    type: 'email',
                    placeholder: 'Your E-Mail'
                },
                value: '',
                validation: {
                    required: true,
                    isEmail: true
                },
                valid: false,
                touched: false
            },
            password: {
                elementType: 'input',
                elementConfig: {
                    type: 'password',
                    placeholder: 'Your Password'
                },
                value: '',
                validation: {
                    required: true,
                    minLength: 6
                },
                valid: false,
                touched: false
            }
        },
        isSignup: true
    }

    componentDidMount() {
        if(!this.props.buildingBurger && this.props.authRedirectUrl) {
            console.log(this.props.buildingBurger)
            this.props.onSetAuthRedirectUrl()
        }
    }

    validationCheck = (value, rules) => {
        if(!rules) {
            return true
        }
        let validity = true
        if(rules.required) {
            validity = value.trim() !== ''
        }
        if(rules.minLength) {
            validity = value.trim().length >= rules.minLength && validity
        }
        if(rules.maxLength) {
            validity = value.trim().length <= rules.maxLength && validity
        }
        if(rules.isEmail) {
            const pattern = /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/
            validity = pattern.test(value) && validity
        }
        return validity
    }

    inputChangedHandler = (event, inputIdentifier) => {
        const updatedControls = {
            ...this.state.controls,
            [inputIdentifier]: {
                ...this.state.controls[inputIdentifier],
                value: event.target.value,
                valid: this.validationCheck(event.target.value, this.state.controls[inputIdentifier].validation),
                touched: true
            }
        }
        this.setState({controls: updatedControls})
    }

    submitHandler = (event) => {
        event.preventDefault()
        this.props.onAuth(this.state.controls.email.value, this.state.controls.password.value, this.state.isSignup)
    }

    switchAuthModeHandler = () => {
        this.setState(prevState => ({isSignup: !prevState.isSignup}))
    }

    render() {
        let formElementsArray = []
        for(let key in this.state.controls) {
        formElementsArray.push({
                id: key,
                config: this.state.controls[key]
            })
        }
        let form = formElementsArray.map(formElement => (
            <Input key={formElement.id} elementType={formElement.config.elementType} 
                elementConfig={formElement.config.elementConfig} value={formElement.config.value} 
                changed={(event) => {this.inputChangedHandler(event, formElement.id)}} invalid={!formElement.config.valid} 
                touched={formElement.config.touched} />
            ))
        if(this.props.loading) {
            form = <Spinner />
        }
        let errorMessage = null
        if(this.props.error) {
            errorMessage = (
                <p><strong>{this.props.error.message}</strong></p>
            )
        }
        let authRedirect = null
        if(this.props.isValidated) {
            authRedirect = <Redirect to={this.props.authRedirectUrl}/>
        }
        return (
            <div className={styles.Auth}>
                {authRedirect}
                {errorMessage}
                <form onSubmit={this.submitHandler}>
                    {form}
                    <Button btnType="Success">SUBMIT</Button>
                </form>
                <Button clicked={this.switchAuthModeHandler}
                    btnType="Danger">SWITCH TO {this.state.isSignup ? 'SIGN IN' : 'SIGN UP'}</Button>
            </div>
        )
    }
}

const mapStateToProps = state => {
    return {
        loading: state.auth.loading,
        error: state.auth.error,
        isValidated: state.auth.token != null,
        buildingBurger: state.burgerBuilder.building,
        authRedirectUrl: state.auth.authRedirectUrl
    }
}

const mapDispatchToProps = dispatch => {
    return {
        onAuth: (email, password, isSignup) => dispatch(actions.auth(email, password, isSignup)),
        onSetAuthRedirectUrl: () => dispatch(actions.setAuthRedirectUrl('/'))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Auth)