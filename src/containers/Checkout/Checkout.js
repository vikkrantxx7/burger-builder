import React, {Component} from 'react'
import CheckoutSummary from '../../components/Order/CheckoutSummary/CheckoutSummary'
import {Route} from 'react-router-dom'
import ContactData from '../Checkout/ContactData/ContactData'

class Checkout extends Component {
    state = {
        ingredients: null,
        totalPrice: 0
    }

    componentWillMount() {
        const query = new URLSearchParams(this.props.location.search)
        const ingredients = {}
        let price = 0
        for(let param of query) {
            if(param[0] === 'price') {
                price = param[1]
            } else {
                ingredients[param[0]] = Number(param[1])
            }
        }
        this.setState({
            ingredients,
            totalPrice: price
        })
    }

    checkoutCancelledHandler = () => {
        this.props.history.goBack()
    }

    checkoutContinuedHandler = () => {
        this.props.history.replace('/checkout/contact-data')
    }

    render() {
        return (
            <div>
                <CheckoutSummary ingredients={this.state.ingredients} checkoutCancelled={this.checkoutCancelledHandler}
                    checkoutContinued={this.checkoutContinuedHandler} />
                <Route path="/checkout/contact-data" render={(props) => <ContactData ingredients={this.state.ingredients} price={this.state.totalPrice} {...props}/>} />
            </div>
        )
    }
}

export default Checkout