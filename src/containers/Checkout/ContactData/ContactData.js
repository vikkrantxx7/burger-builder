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
                value: ''
            },
            street: {
                elementType: 'textarea',
                elementConfig: {
                    type: 'text',
                    placeholder: 'Your Address'
                },
                value: ''
            },
            zipcode: {
                elementType: 'input',
                elementConfig: {
                    type: 'text',
                    placeholder: 'Zip Code'
                },
                value: ''
            },
            country: {
                elementType: 'input',
                elementConfig: {
                    type: 'text',
                    placeholder: 'Country'
                },
                value: ''
            },
            email: {
                elementType: 'input',
                elementConfig: {
                    type: 'email',
                    placeholder: 'Your Email'
                },
                value: ''
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
        this.setState({
            loading: true
        })
        const order = {
            ingredients: this.props.ingredients,
            price: this.props.price
        }
        console.log(order)
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
    }

    inputChangedHandler = (event, inputIdentifier) => {
        const updatedOrderForm = {
            ...this.state.orderForm
        }
        const updatedFormElement = {
            ...updatedOrderForm[inputIdentifier]
        }
        updatedFormElement.value = event.target.value
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
            <form>
                {formElementsArray.map(formElement => (
                    <Input key={formElement.id} elementType={formElement.config.elementType} 
                        elementConfig={formElement.config.elementConfig} value={formElement.config.value} changed={(event) => {this.inputChangedHandler(event, formElement.id)}} />
                ))}
                <Button btnType="Success" clicked={this.orderHandler}>Order</Button>
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