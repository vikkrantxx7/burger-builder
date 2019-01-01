import React from 'react'
import Burger from '../../components/Burger/Burger'
import BuildControls from '../../components/Burger/BuildControls/BuildControls'
import Modal from '../../components/UI/Modal/Modal'
import OrderSummary from '../../components/Burger/OrderSummary/OrderSummary'
import axios from '../../axios-orders'
import Spinner from '../../components/UI/Spinner/Spinner'
import withErrorHandler from '../../hoc/withErrorHandler/withErrorHandler'
import * as actionTypes from '../../store/actions'
import { connect } from 'react-redux'

class BurgerBuilder extends React.Component {
    state = {
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
        return totalIngredients > 0
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
        const queryParams = []
        for(let i in this.state.ingredients) {
            queryParams.push(encodeURIComponent(i) + '=' + encodeURIComponent(this.state.ingredients[i]))
        }
        queryParams.push('price='+this.props.totPrc)
        this.props.history.push({
            pathname: '/checkout',
            search: '?' + queryParams.join('&')
        })
    }

    render() {
        const disabledInfo = {
            ...this.props.ings
        }
        for(let key in disabledInfo) {
            disabledInfo[key] = disabledInfo[key] <= 0
        }
        let orderSummary = null
        let burger = this.state.error ? <p>Burger Ingredient's can't be fetched !</p> : <Spinner />
        if(this.props.ings) {
            orderSummary = <OrderSummary ingredients={this.props.ings} purchasing={this.state.purchasing}
                purchaseContinued={this.purchaseContinueHandler} purchaseCancelled={this.purchaseCancelHandler}
                price={this.props.totPrc} />
            burger = <>
                        <Burger ingredients={this.props.ings} />
                        <BuildControls ingredientAdded={this.props.onIngredientAdded} 
                            ingredientRemoved={this.props.onIngredientRemoved} 
                            disabled={disabledInfo} totalPrice={this.props.totPrc}
                            purchaseState={this.updatePurchaseState(this.props.ings)} ordered={this.purchaseHandler}/>
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

const mapStateToProps = state => {
    return {
        ings: state.ingredients,
        totPrc: state.totalPrice
    }
}

const mapDispatchToProps = dispatch => {
    return {
        onIngredientAdded: (ingName) => dispatch({type: actionTypes.ADD_INGREDIENT, ingredientName: ingName}),
        onIngredientRemoved: (ingName) => dispatch({type: actionTypes.REMOVE_INGREDIENT, ingredientName: ingName})
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(withErrorHandler(BurgerBuilder, axios))