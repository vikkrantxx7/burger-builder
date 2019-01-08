import React, { Component } from 'react'
import Input from '../../components/UI/Input/Input'
import Button from '../../components/UI/Button/Button'
import styles from './Auth.module.css'

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
        return (
            <div className={styles.Auth}>
                <form>
                    {form}
                    <Button btnType="Success">SUBMIT</Button>
                </form>
            </div>
        )
    }
}

export default Auth