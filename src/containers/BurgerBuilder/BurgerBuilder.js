import React from 'react'
import Burger from '../../components/Burger/Burger'
import BuildControls from '../../components/Burger/BuildControls/BuildControls'
import Modal from '../../components/UI/Modal/Modal'
import OrderSummary from '../../components/Burger/OrderSummary/OrderSummary'
import axios from '../../axios-orders'
import Spinner from '../../components/UI/Spinner/Spinner'
import withErrorHandler from '../../hoc/withErrorHandler/withErrorHandler'
import * as actions from '../../store/actions/index'
import { connect } from 'react-redux'

export class BurgerBuilder extends React.Component {
    state = {
        purchasing: false
    }

    componentDidMount() {
        this.props.onInitIngredients()
    }

    updatePurchaseState = (updatedIngredients) => {
        let totalIngredients = 0
        for(let key in updatedIngredients) {
            totalIngredients += updatedIngredients[key]
        }
        return totalIngredients > 0
    }

    purchaseHandler = () => {
        if(this.props.isAuthenticated) {
            this.setState({
                purchasing: true
            })
        } else {
            this.props.onSetAuthRedirectUrl('/checkout')
            this.props.history.push('/auth')
        }
    }

    purchaseCancelHandler = () => {
        this.setState({
            purchasing: false
        })
    }

    purchaseContinueHandler = () => {
        this.props.history.push('/checkout')
    }

    render() {
        const disabledInfo = {
            ...this.props.ings
        }
        for(let key in disabledInfo) {
            disabledInfo[key] = disabledInfo[key] <= 0
        }
        let orderSummary = null
        let burger = this.props.error ? <p>Burger Ingredient's can't be fetched !</p> : <Spinner />
        if(this.props.ings) {
            orderSummary = <OrderSummary ingredients={this.props.ings} purchasing={this.state.purchasing}
                purchaseContinued={this.purchaseContinueHandler} purchaseCancelled={this.purchaseCancelHandler}
                price={this.props.totPrc} />
            burger = <>
                        <Burger ingredients={this.props.ings} />
                        <BuildControls ingredientAdded={this.props.onIngredientAdded} 
                            ingredientRemoved={this.props.onIngredientRemoved} 
                            disabled={disabledInfo} totalPrice={this.props.totPrc}
                            isAuth={this.props.isAuthenticated}
                            purchaseState={this.updatePurchaseState(this.props.ings)} ordered={this.purchaseHandler}/>
                    </>
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
        ings: state.burgerBuilder.ingredients,
        totPrc: state.burgerBuilder.totalPrice,
        err: state.burgerBuilder.error,
        isAuthenticated: state.auth.token !== null
    }
}

const mapDispatchToProps = dispatch => {
    return {
        onIngredientAdded: (ingName) => dispatch(actions.addIngredient(ingName)),
        onIngredientRemoved: (ingName) => dispatch(actions.removeIngredient(ingName)),
        onInitIngredients: () => dispatch(actions.initIngredients()),
        onSetAuthRedirectUrl: (url) => dispatch(actions.setAuthRedirectUrl(url))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(withErrorHandler(BurgerBuilder, axios))