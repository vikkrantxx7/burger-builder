import React, {Component} from 'react'
import Button from '../../../components/UI/Button/Button'
import styles from './ContactData.module.css'
import axios from '../../../axios-orders'
import Spinner from '../../../components/UI/Spinner/Spinner'
import Input from '../../../components/UI/Input/Input'

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
                touched: false
            },
            street: {
                elementType: 'textarea',
                elementConfig: {
                    type: 'text',
                    placeholder: 'Your Address'
                },
                value: '',
                validation: {
                    required: true
                },
                valid: false,
                touched: false
            },
            zipcode: {
                elementType: 'input',
                elementConfig: {
                    type: 'text',
                    placeholder: 'Zip Code'
                },
                value: '',
                validation: {
                    required: true,
                    minLength: 6,
                    maxLength: 6
                },
                valid: false,
                touched: false
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
                touched: false
            },
            email: {
                elementType: 'input',
                elementConfig: {
                    type: 'email',
                    placeholder: 'Your Email'
                },
                value: '',
                validation: {
                    required: true
                },
                valid: false,
                touched: false
            },
            deliveryMethod: {
                elementType: 'select',
                elementConfig: {
                    options: [
                        {value: 'fastest', displayValue: 'Fastest'},
                        {value: 'cheapest', displayValue: 'Cheapest'}
                    ]
                },
                value: 'cheapest'
            }
        },
        loading: false
    }

    orderHandler = (event) => {
        event.preventDefault()
        if(this.props.price > 0) {
            this.setState({
                loading: true
            })
            const formData = {}
            for(let key in this.state.orderForm) {
                formData[key] = this.state.orderForm[key].value
            }
            const order = {
                ingredients: this.props.ingredients,
                price: this.props.price,
                orderData: formData
            }
            console.log(this.state.orderForm)
            axios.post('orders.json', order)
                .then(Response => {
                    this.setState({
                        loading: false
                    }, () => {this.props.history.push('/')})
                    console.log(Response)
                })
                .catch(error => {
                    this.setState({
                        loading: false
                    })
                    console.error(error)
                });
        } else {
            this.props.history.push('/')
        }
    }

    validationCheck = (value, rules) => {
        let validity = false
        if(rules.required) {
            validity = value.trim() !== ''
            if(validity && rules.minLength) {
                validity = value.trim().length >= rules.minLength                
            }
            if(validity && rules.maxLength) {
                validity = value.trim().length <= rules.maxLength
            }
        }
        return validity
    }

    inputChangedHandler = (event, inputIdentifier) => {
        const updatedOrderForm = {
            ...this.state.orderForm
        }
        const updatedFormElement = {
            ...updatedOrderForm[inputIdentifier]
        }
        updatedFormElement.value = event.target.value
        updatedFormElement.touched = true
        const isValid = this.validationCheck(updatedFormElement.value, updatedFormElement.validation)
        updatedFormElement.valid = isValid
        updatedOrderForm[inputIdentifier] = updatedFormElement
        this.setState({
            orderForm: updatedOrderForm
        })
    }
    
    render() {
        let formElementsArray = []
        for(let key in this.state.orderForm) {
            formElementsArray.push({
                id: key,
                config: this.state.orderForm[key]
            })
        }
        let form = (
            <form onSubmit={this.orderHandler}>
                {formElementsArray.map(formElement => (
                    <Input key={formElement.id} elementType={formElement.config.elementType} 
                        elementConfig={formElement.config.elementConfig} value={formElement.config.value} 
                        changed={(event) => {this.inputChangedHandler(event, formElement.id)}} invalid={!formElement.config.valid} 
                        touched={formElement.config.touched} />
                ))}
                <Button btnType="Success">Order</Button>
            </form>
        )
        if(this.state.loading) {
            form = <Spinner />
        }
        return(
            <div className={styles.ContactData}>
                <h4>Enter your contact data</h4>
                {form}
            </div>
        )
    }
}

export default ContactData