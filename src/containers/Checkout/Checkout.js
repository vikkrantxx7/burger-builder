import React, {Component} from 'react'
import CheckoutSummary from '../../components/Order/CheckoutSummary/CheckoutSummary'

class Checkout extends Component {
    state = {
        ingredients: {
            salad:1,
            cheese:1,
            bacon:1,
            meat:1
        }
    }

    componentDidMount() {
        const query = new URLSearchParams(this.props.location.search)
        const ingredients = {}
        for(let param of query) {
            ingredients[param[0]] = Number(param[1])
        }
        this.setState({ingredients})
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
            </div>
        )
    }
}

export default Checkout