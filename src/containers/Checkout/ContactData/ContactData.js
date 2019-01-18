import React, {Component} from 'react'
import Button from '../../../components/UI/Button/Button'
import styles from './ContactData.module.css'
import axios from '../../../axios-orders'
import Spinner from '../../../components/UI/Spinner/Spinner'
import Input from '../../../components/UI/Input/Input'
import { connect } from 'react-redux'
import withErrorHandler from '../../../hoc/withErrorHandler/withErrorHandler'
import * as orderActions from '../../../store/actions/index'

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
                value: 'cheapest',
                validation: {},
                valid: true
            }
        },
        formIsValid: false
    }

    componentDidMount() {
        this.props.onPurchaseInit()
    }

    componentDidUpdate() {
        if(this.props.purchased) {
            this.props.history.push('/')
        }
    }

    orderHandler = (event) => {
        event.preventDefault()
        if(this.props.totPrc > 0) {
            const formData = {}
            for(let key in this.state.orderForm) {
                formData[key] = this.state.orderForm[key].value
            }
            const order = {
                ingredients: this.props.ings,
                price: this.props.totPrc,
                orderData: formData
            }
            this.props.onOrderBurger(order, this.props.token)
        } else {
            this.props.history.push('/')
        }
    }

    validationCheck = (value, rules) => {
        if(Object.entries(rules).length === 0) {
            return true
        }
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
        let formIsValid = true
        for(let inputIdentifier in updatedOrderForm) {
            formIsValid = formIsValid && updatedOrderForm[inputIdentifier].valid
        }
        this.setState({
            orderForm: updatedOrderForm,
            formIsValid
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
                <Button btnType="Success" disabled={!this.state.formIsValid}>Order</Button>
            </form>
        )
        if(this.props.loading) {
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

const mapStateToProps = state => {
    return {
        ings: state.burgerBuilder.ingredients,
        totPrc: state.burgerBuilder.totalPrice,
        loading: state.order.loading,
        purchased: state.order.purchased,
        token: state.auth.token
    }
}

const mapDispatchToProps = dispatch => {
    return {
        onOrderBurger: (orderData, token) => dispatch(orderActions.purchaseBurger(orderData, token)),
        onPurchaseInit: () => dispatch(orderActions.purchaseInit())
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(withErrorHandler(ContactData, axios))