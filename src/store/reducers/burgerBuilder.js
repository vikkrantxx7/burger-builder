import * as actionTypes from '../actions/actionTypes'
import {updateObject} from '../utility'

const INGREDIENT_PRICES = {
    salad: 3.25,
    bacon: 8.50,
    cheese: 5.30,
    meat: 6.43
}

const initialState = {
    ingredients: null,
    totalPrice: 6,
    error: false
}

const reducer = (state = initialState, action) => {
    switch (action.type) {
        case actionTypes.ADD_INGREDIENT:
            const updatedIngredient = {[action.ingredientName]: state.ingredients[action.ingredientName] + 1}
            const updatedIngredients = updateObject(state.ingredients, updatedIngredient)
            const updatedState = {
                ingredients: updatedIngredients,
                totalPrice: state.totalPrice + INGREDIENT_PRICES[action.ingredientName]
            }
            return updateObject(state, updatedState)
        case actionTypes.REMOVE_INGREDIENT:
            const updatedIngredient1 = {[action.ingredientName]: state.ingredients[action.ingredientName] - 1}
            const updatedIngredients1 = updateObject(state.ingredients, updatedIngredient1)
            const updatedState1 = {
                ingredients: updatedIngredients1,
                totalPrice: state.totalPrice - INGREDIENT_PRICES[action.ingredientName]
            }
            return updateObject(state, updatedState1)
        case actionTypes.SET_INGREDIENTS: 
            return updateObject(state, {
                ingredients: {
                    salad: action.ingredients.salad,
                    bacon: action.ingredients.bacon,
                    cheese: action.ingredients.cheese,
                    meat: action.ingredients.meat
                },
                totalPrice: 6,
                error: false
            })
        case actionTypes.FETCH_INGREDIENTS_FAILED:
            return updateObject(state, {
                error: true
            })
        default:
            return state
    }
}

export default reducer