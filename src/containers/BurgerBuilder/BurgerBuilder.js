import React from 'react'
import Burger from '../../components/Burger/Burger'
import BuildControls from '../../components/Burger/BuildControls/BuildControls'
import Modal from '../../components/UI/Modal/Modal'
import OrderSummary from '../../components/Burger/OrderSummary/OrderSummary'
import axios from '../../axios-orders'
import Spinner from '../../components/UI/Spinner/Spinner'
import withErrorHandler from '../../hoc/withErrorHandler/withErrorHandler'

const INGREDIENT_PRICES = {
    salad: 3,
    bacon: 10,
    cheese: 5,
    meat: 6
}
class BurgerBuilder extends React.Component {
    state = {
        ingredients: null,
        totalPrice: 6,
        purchasable: false,
        purchasing: false,
        loading: false,
        error: false
    }

    componentDidMount() {
        axios.get('ingredients.json')
            .then(response => {
                this.setState({
                    ingredients: response.data
                })
            }).catch(error => {
                this.setState({
                    error: true
                })
            })
    }

    updatePurchaseState = (updatedIngredients) => {
        let totalIngredients = 0
        for(let key in updatedIngredients) {
            totalIngredients += updatedIngredients[key]
        }
        this.setState({
            purchasable: totalIngredients > 0
        })
    }

    purchaseHandler = () => {
        this.setState({
            purchasing: true
        })
    }

    purchaseCancelHandler = () => {
        this.setState({
            purchasing: false
        })
    }

    purchaseContinueHandler = () => {
        // this.setState({
        //     loading: true
        // })
        // const order = {
        //     ingredients: this.state.ingredients,
        //     price: this.state.totalPrice,
        //     customer: {
        //         name: 'Vikrant Sharma',
        //         address: {
        //             street: 'Vijayapuri Colony, Hyderabad',
        //             zipcode: '501301',
        //             country: 'India'
        //         },
        //         email: 'vikkrant.xx7@gmail.com'
        //     },
        //     deliveryMethod: 'fastest'
        // }

        // axios.post('orders.json', order)
        //     .then(Response => {
        //         this.setState({
        //             loading: false,
        //             purchasing: false
        //         })
        //         console.log(Response)
        //     })
        //     .catch(error => {
        //         this.setState({
        //             loading: false,
        //             purchasing: false
        //         })
        //         console.error(error)
        //     });
        this.props.history.push('/checkout')
    }

    addIngredientHandler = (type) => {
        const oldCount = this.state.ingredients[type]
        const updatedCount = oldCount + 1
        const updatedIngredients = {
            ...this.state.ingredients
        }
        updatedIngredients[type] = updatedCount
        const priceAddition = INGREDIENT_PRICES[type]
        const oldPrice = this.state.totalPrice
        const newPrice = oldPrice + priceAddition
        this.setState({
            ingredients: updatedIngredients,
            totalPrice: newPrice
        })
        this.updatePurchaseState(updatedIngredients)
    }

    removeIngredientHandler = (type) => {
        const oldCount = this.state.ingredients[type]
        const updatedCount = oldCount - 1
        const updatedIngredients = {
            ...this.state.ingredients
        }
        updatedIngredients[type] = updatedCount
        const priceDeletion = INGREDIENT_PRICES[type]
        const oldPrice = this.state.totalPrice
        const newPrice = oldPrice - priceDeletion
        this.setState({
            ingredients: updatedIngredients,
            totalPrice: newPrice
        })
        this.updatePurchaseState(updatedIngredients)
    }

    render() {
        const disabledInfo = {
            ...this.state.ingredients
        }
        for(let key in disabledInfo) {
            disabledInfo[key] = disabledInfo[key] <= 0
        }
        let orderSummary = null
        let burger = this.state.error ? <p>Burger Ingredient's can't be fetched !</p> : <Spinner />
        if(this.state.ingredients) {
            orderSummary = <OrderSummary ingredients={this.state.ingredients} purchasing={this.state.purchasing}
                purchaseContinued={this.purchaseContinueHandler} purchaseCancelled={this.purchaseCancelHandler}
                price={this.state.totalPrice} />
            burger = <>
                        <Burger ingredients={this.state.ingredients} />
                        <BuildControls ingredientAdded={this.addIngredientHandler} 
                            ingredientRemoved={this.removeIngredientHandler} 
                            disabled={disabledInfo} totalPrice={this.state.totalPrice}
                            purchaseState={this.state.purchasable} ordered={this.purchaseHandler}/>
                    </>
        }
        
        if(this.state.loading) {
            orderSummary = <Spinner />
        }
        return (
            <>
                <Modal purchasing={this.state.purchasing} modalClosed={this.purchaseCancelHandler}>
                    {orderSummary}
                </Modal>
                {burger}
            </>
        )
    }
}

export default withErrorHandler(BurgerBuilder, axios)